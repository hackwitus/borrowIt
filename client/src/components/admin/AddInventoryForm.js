import React from 'react';
import { Form, Field } from 'react-final-form';

class AddInventoryForm extends React.Component {
  constructor(props){
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit(values, form) {
    form.reset()
    this.props.onAddItem(values)
  }
  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        render={({ handleSubmit, reset, submitting, pristine }) => (
          <form onSubmit={handleSubmit} className="form-inline">
            <Field 
              name="item_name"
              render={({input, meta}) => (
                <input 
                  {...input}
                  type="text"
                  placeholder="Name"
                  id="item_name"
                  className='form-control mr-sm-2'
                />
              )}
            />
            <Field 
              name="item_description"
              render={({input, meta}) => (
                <input 
                  {...input}
                  type="text"
                  placeholder="Description"
                  id="item_description"
                  className='form-control mr-sm-2'
                />
              )}
            />
            <Field 
              name="item_owner"
              render={({input, meta}) => (
                <input 
                  {...input}
                  type="text"
                  placeholder="Owner"
                  id="item_owner"
                  className='form-control mr-sm-2'
                />
              )}
            />
            <Field 
              name="item_quantity"
              render={({input, meta}) => (
                <input 
                  {...input}
                  type="number"
                  placeholder="Quantity"
                  min={1}
                  id="item_quantity"
                  className='form-control mr-sm-2'
                />
              )}
            />
            <button 
              type="submit"
              className="btn btn-success my-2 my-sm-0"
              disabled={submitting || pristine}
            >
              Add Item
            </button>
          </form>
        )}
      />
    )
  }
}

export default AddInventoryForm