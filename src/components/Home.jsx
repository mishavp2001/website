import React from "react";
import PropTypes from 'prop-types';

import RecipeList from "./RecipeList.jsx";
import RecipeDetail from "./RecipeDetail.jsx";
import RecipeView from "./RecipeView.jsx";

import CreateForm from "./CreateForm.jsx";
import SearchBox from "./SearchBox.jsx";
import Modal from "react-modal";

const LOCAL_STORAGE_KEY = 'recipes';

class Home extends React.Component {
  constructor(props){
    super();
    this.props = props;
    let selectedRecipe;
    this.props && this.props.selectedRecipe ? {selectedRecipe} =  this.props : selectedRecipe = null;
debugger;
    let localStorage = this.props.db.ref(LOCAL_STORAGE_KEY).once('value').then(function(recipe){
      this.setState({
        recipes: recipe.val() ? JSON.parse(recipe.val()) : [],
        showCreate: true
      })
    }.bind(this));
    this.state = {
      showCreate: !selectedRecipe,
      recipes: [],
      selectedRecipe: selectedRecipe,
      search: '',
      }
    }

    showCreate() {
      this.setState({
        showCreate: true
      })
    }

  handleCreateReceipt(name, ingridients,instructions) {
    //console.log(name, ingridients,instructions);
      let temprecipes = this.state.recipes;
      let newrecipe = {id: new Date().getTime(),
      name, ingridients,instructions};

      !temprecipes[name] ? (temprecipes = temprecipes.concat(newrecipe) ) : (temprecipes[name] = newrecipe)

      this.setState({recipes: temprecipes})

      this.props.db.ref(LOCAL_STORAGE_KEY).set( JSON.stringify(temprecipes));

      //window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(temprecipes));
  }

  handleSelectRecipe(recipe){
    //console.log(recepie);
    this.setState(
      {showCreate: false,
      selectedRecipe: recipe}
    )
  }

  handleSearchChange(search){
    this.setState(
      {search}
    );
  }

  handleDelete (){
    let newSet = this.state.recipes.filter(item => {
      return (item.name !== this.state.selectedRecipe.name)
    });

    //window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    this.props.db.ref(LOCAL_STORAGE_KEY).set( JSON.stringify(newSet));

    //window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSet));
    this.setState({recipes: newSet,
                  selectedRecipe: null})
  }

  render() {
    const {recipes, selectedRecipe, showCreate, search} = this.state;
    const filterRecipes = recipes
    .filter(recipe => recipe.name.toLowerCase().indexOf(search.toLowerCase())> -1)
    .sort((a,b) => a.name > b.name);
    var recipe = {};
    return (
      <div className="container">
        {!this.props.edit ?
          <div className='view-mode'>
              <RecipeList
                  recipes={filterRecipes}
                  onSelectRecepie={this.handleSelectRecipe.bind(this)}
              />
            <RecipeView recipe={selectedRecipe}/>
          </div>
        :
        <div className='edit-mode'>
          <div className='row '>
              <div className='col-xs-4'>
                <SearchBox onChange={this.handleSearchChange.bind(this)}/>
                <RecipeList
                    recipes={filterRecipes}
                    onSelectRecepie={this.handleSelectRecipe.bind(this)}
                   />
                <button type="button"
                  className='bbtn btn-primary'
                  style={{width: '100%',
                  marginBottom: '5px'}}
                  onClick={this.showCreate.bind(this)}>
                  Create new recipe
                </button>
              </div>
              <div className='col-xs-8'>
                {showCreate ? <CreateForm onSubmit={this.handleCreateReceipt.bind(this)}/> :
                <RecipeDetail onSubmit={this.handleCreateReceipt.bind(this)}
                              onDelete={this.handleDelete.bind(this)}
                              recipe={selectedRecipe}/>}
              </div>
          </div>
        </div>
        }
      </div>
    )
  }

}

export default Home;
