import * as React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom'

class RecipeDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      ingridients:'',
      instructions:'',
      modalIsOpen: false
    }
    this.closeModal = this.closeModal.bind(this);
  }



  closeModal() {
    this.setState({modalIsOpen: false, preview: false});
  }


  render() {
    debugger;
      let recipes = this.props.recipe ?  this.props.recipe : {};
      let {name ="", ingridients="", instructions="", created=false} = recipes;

      return(
        <div>
        {this.props.recipe &&  <div>
             <Modal
                 isOpen={this.state.modalIsOpen}
                 onRequestClose={this.closeModal}
                 contentLabel="Preview"
               >
               <button onClick={this.closeModal}>close</button>
                <form>
                  <input />
                  <button>tab navigation</button>
                  <button>stays</button>
                  <button>inside</button>
                  <button>the modal</button>
                </form>
             </Modal>
             <div style={{width:'100%', height:'100%', position: 'absolute'}}className="preview-div">
               <p dangerouslySetInnerHTML={{ __html: ingridients }} />
               <p dangerouslySetInnerHTML={{ __html: instructions }} />
                <Link to='/edit'>edit</Link>
             </div>
        </div>
        }
        {!this.props.recipe &&
          <div>
          <h1>Welcome to my page</h1>
          
        </div>}
      </div>
      );
    }
  }

export default RecipeDetail;
