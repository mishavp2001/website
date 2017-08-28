import * as React from 'react';
import PropTypes from 'prop-types';

class CreateForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      lastname: '',
      ingridients:'',
      instructions:'',
      created: false
    }
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
      instructions:''
    })
  }

  handleChangeValue(name, e){
    e.preventDefault();
    let obj = {};
    obj[name] = e.target.value;
    this.setState(obj);
    console.log(name);
  }

  render() {
      const {name, ingridients, instructions, created} = this.state;

      return(
        <form onSubmit={this.handleSubmit.bind(this)}>
          {created && <div className="alert alert-success">Your recipe {this.state.lastname} was just created !</div>}
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
          <input className='btn btn-default' type='submit' value='Save' />
        </form>
      );
    }
  }

  CreateForm.propTypes = {
    onSubmit: PropTypes.func
  }

export default CreateForm;
