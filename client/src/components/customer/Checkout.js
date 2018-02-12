import React from 'react';
import { Form, Field } from 'react-final-form';

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit(values, form) {
    const error = {}
    const payload = {
      customer: {
        phoneNumber: values.customer_phoneNumber
      },
      items: this.props.cart.reduce((acc, item) => {
        for (var i = 0; i < item.quantity; i++)
          acc.push(item.id)
        return acc
      }, []),
      collateral: values.customer_collateral
    }

    if (values.new_customer) {
      payload.customer = {
        ...payload.customer,
        name: values.customer_name,
        email: values.customer_email,
      }
    } 

    return new Promise((resolve, reject) => {
      if (error) resolve(error) // resolve client side errors

      fetch('https://api-ahtaxdhvbo.now.sh/transactions/borrowed', {
        method: 'POST',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(payload)
      }).then(res => res.json())
        .then(json => {
          form.reset()
          this.props.onTransactionSuccess()
          resolve()
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  }
  render() {
    function validFormField(meta) {
      return meta.touched ? ( meta.error ? 'is-invalid' : 'is-valid' ) : null 
    }
    return (
      <React.Fragment>
        <Form 
          onSubmit={this.onSubmit}
          initialValues={{
            new_customer: true
          }}
          validate={values => {
            const { 
              new_customer, 
              customer_name,
              customer_email, 
              customer_collateral,
              customer_phoneNumber 
            } = values

            const errors = {}

            if (new_customer && !customer_name)
              errors.customer_name = "Required"
            if (new_customer && !customer_email)
              errors.customer_email = "Required"

            if (!customer_collateral)
              errors.customer_collateral = "Required"

            if (customer_phoneNumber && !/^\w{3}-\w{3}-\w{4}$/.test(customer_phoneNumber))
              errors.customer_phoneNumber = "Must be in valid phone number format"
            else if (!customer_phoneNumber)
              errors.customer_phoneNumber = "Required"

            return errors
          }}
          render={({ handleSubmit, reset, submitting, pristine, values, submitSucceeded }) => (
            <form onSubmit={handleSubmit}>
              <h2>Checkout Form</h2>
              <Field 
                name="customer_phoneNumber"
                render={({input, meta}) => (
                  <div className="form-group">
                    <label htmlFor="customer_phoneNumber" >Phone Number: </label>
                    <input 
                      {...input} 
                      type="tel" 
                      placeholder="Enter your phone number" 
                      id="customer_phoneNumber" 
                      className={`form-control ${validFormField(meta)}`}
                    />
                    {meta.error && meta.touched && <div className="invalid-feedback">{meta.error}</div>}
                    <small className="form-text text-muted">Valid format: 123-456-7890</small>
                  </div>
                )}
              />
              <Field 
                name="customer_collateral"
                render={({input, meta}) => (
                  <div className="form-group">
                    <label htmlFor="customer_collateral" >Collateral: </label>
                    <input 
                      {...input} 
                      type="tel" 
                      placeholder="Enter a brief description" 
                      id="customer_collateral" 
                      className={`form-control ${validFormField(meta)}`}
                    />
                    {meta.error && meta.touched && <div className="invalid-feedback">{meta.error}</div>}
                    <small className="form-text text-muted">Example: "Student ID ending in 7360"</small>
                  </div>
                )}
              />
              <Field
                name="new_customer"
                render={({ input }) => (
                  <div className="form-check">
                    <input {...input} type="checkbox" checked={input.value} className="form-check-input" id="new_customer" />
                    <label className="form-check-label" htmlFor="new_customer" >Are you a new customer?</label>
                  </div>
                )}
              />

              { values.new_customer && (
                <React.Fragment>
                  <Field 
                    name="customer_name"
                    render={({input, meta}) => (
                      <div className="form-group">
                        <label htmlFor="customer_name" >Name: </label>
                        <input 
                          {...input} 
                          type="text" 
                          placeholder="Enter your name" 
                          id="customer_name" 
                          className={`form-control ${validFormField(meta)}`}
                        />
                        {meta.error && meta.touched && <div className="invalid-feedback">{meta.error}</div>}
                      </div>
                    )}
                  />
                  <Field 
                    name="customer_email"
                    render={({input, meta}) => (
                      <div className="form-group">
                        <label htmlFor="customer_email" >Email: </label>
                        <input 
                          {...input} 
                          type="email" 
                          placeholder="Enter your email" 
                          id="customer_email" 
                          className={`form-control ${validFormField(meta)}`}
                        />
                        {meta.error && meta.touched && <div className="invalid-feedback">{meta.error}</div>}
                      </div>
                    )}
                  />
                </React.Fragment>
              )}

              <div>
                <button 
                  type="submit"
                  disabled={this.props.cart.length > 0 && ( submitting || pristine )}
                  className="btn btn-primary"
                > 
                  Checkout <span className="oi oi-cart"></span>
                </button>
                {
                  submitSucceeded && <p className="text-success font-weight-bold">Transaction Processed <span className="oi oi-check"></span></p>
                }
              </div>
            </form>
          )}
        />
      </React.Fragment>
    )
  }
}

export default Checkout;