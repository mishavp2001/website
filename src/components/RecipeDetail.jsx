import * as React from 'react';
import Modal from 'react-modal';

class RecipeDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      lastname: '',
      ingridients:'',
      instructions:'',
      created: false,
      edit: false,
      preview: false,
      modalIsOpen: false
    }
    this.closeModal = this.closeModal.bind(this);
  }



  closeModal() {
    this.setState({modalIsOpen: false, preview: false});
  }

  handleSubmit (e) {
    e.preventDefault();
    const {ingridients, name, instructions} = this.state;
    this.props.onSubmit(name,ingridients, instructions);
    this.resetForm();
    this.setState({lastname: name});
    this.setState({created: true});
    this.refs.name.focus();
  }

  resetForm (e) {
    this.setState({
      name: '',
      ingridients:'',
      instructions:'',
      preview: false,
      edit: false
    })
  }

  handleChangeValue(name, e){
    e.preventDefault();
    let {recipe={}} = this.props;
    recipe.edit = true;
    recipe[name] = e.target.value;
    this.setState(recipe);
    console.log(name);
  }

  getPreview() {
    return !this.state.preview ? "Preview" : "Edit";
  }

  switchPreview() {
    this.setState({preview: !this.state.preview,
          modalIsOpen: true
      });
  }

  render() {
      const {onDelete} = this.props;
      const {preview} = this.state;
      //const defVal = {"","","", false};
      var recipe = {};
      !this.state.edit ? {recipe} =  this.props : recipe =  this.state;
      //console.log(recipe);
      let {name ="", ingridients="", instructions="", created=false} = recipe;

      const confirmDelete =() =>
        {
          if(confirm('Are you sure you want to delete?')){
            onDelete();
        }
      }

      return(
        <div>
             <Modal
                 isOpen={this.state.modalIsOpen}
                 onRequestClose={this.closeModal}
                 contentLabel="Preview"
               >
               <div>
                 <button onClick={this.closeModal}>close</button>
                <form>
                  <input />
                  <button>tab navigation</button>
                  <button>stays</button>
                  <button>inside</button>
                  <button>the modal</button>
                </form>
                <div style={{width:'100%', height:'100%', position: 'absolute'}}className="preview-div">
                  <h1>Preview {name}</h1>
                  <p dangerouslySetInnerHTML={{ __html: ingridients }} />
                  <p dangerouslySetInnerHTML={{ __html: instructions }} />
                </div>
              </div>
             </Modal>
            <form onSubmit={this.handleSubmit.bind(this)}>
            {created && <div className="alert alert-success">Your recipe {this.state.lastname} was just created !</div>}
            {!preview &&
              <div className="edit-div">
                <div className='form-group'>
                  <label htmlFor='name'>
                    Name
                  </label>
                  <input
                    type="text"
                    className='form-control'
                    rows='1'
                    id='name'
                    placeholder='Receipe Name'
                    value ={name}
                    ref='name'
                    onChange={this.handleChangeValue.bind(this, 'name')}
                    />
                </div>
                <div className='form-group'>
                <label htmlFor='ingridients'>
                  Ingridients
                </label>
                <textarea
                  className='form-control'
                  rows='5'
                  id='ingridients'
                  placeholder='Enter Ingridients'
                  value ={ingridients}
                  onChange={this.handleChangeValue.bind(this, 'ingridients')}
                  />
              </div>
                <div className='form-group'>
                <label htmlFor='instructions'>
                  Instructions
                </label>
                <textarea
                  className='form-control'
                  rows='5'
                  id='instructions'
                  placeholder='Enter instructions'
                  value ={instructions}
                  onChange={this.handleChangeValue.bind(this, 'instructions')}
                  />
              </div>
              </div>
            }
            <input className='btn btn-default' type='submit' value='Save' />
            <button type='button' className='btn btn-danger' onClick={confirmDelete}>Delete</button>
            <input className='btn btn-default' type='button' value={this.getPreview()} onClick={this.switchPreview.bind(this)} />

        </form>
        </div>
      );
    }
  }

  RecipeDetail.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
  }

export default RecipeDetail;
