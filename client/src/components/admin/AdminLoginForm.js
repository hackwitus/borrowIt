import React from 'react';
import { Form, Field } from 'react-final-form';

class AdminLoginForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      failedLogin: false
    }
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit(values, form) {
    this.props.onLogin({
      username: values.admin_username,
      password: values.admin_password
    }, (err) => {
      if (err) {
        this.setState({ failedLogin: true })
      }
    })
  }
  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        render={({ handleSubmit, reset, submitting, pristine }) => (
          <form onSubmit={handleSubmit} className="form-inline">
            <Field 
              name="admin_username"
              render={({input, meta}) => (
                <input 
                  {...input}
                  type="text"
                  placeholder="Admin Username"
                  id="admin_username"
                  className={`form-control mr-sm-2 ${this.state.failedLogin && 'is-invalid'}`}
                />
              )}
            />
            <Field 
              name="admin_password"
              render={({input, meta}) => (
                <input 
                  {...input}
                  type="password"
                  placeholder="Admin Password"
                  id="admin_password"
                  className={`form-control mr-sm-2 ${this.state.failedLogin && 'is-invalid'}`}
                />
              )}
            />
            <button 
              type="submit"
              className="btn btn-outline-info my-2 my-sm-0"
              disabled={submitting || pristine}
            >
              Admin Login
            </button>
          </form>
        )}
      />
    )
  }
}

export default AdminLoginForm