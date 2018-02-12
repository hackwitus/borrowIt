import React from 'react';
import ItemDropdown from './ItemDropdown';

class TransactionTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: [],
      customer: {}
    }
    this.getTransactionFromAPI = this.getTransactionFromAPI.bind(this)
    this.getCustomerFromAPI = this.getCustomerFromAPI.bind(this)
  }
  handleEdit(transaction) {
    console.log(transaction)
  }
  handleDelete(transaction) {
    fetch('https://api-ahtaxdhvbo.now.sh/transactions/delete', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ transaction })
    }) 
      .then(res => res.json())
      .then(msg => {
        console.log(msg)
        this.getTransactionFromAPI()
      })
      .catch(err => console.log(err))
  }
  handleReturn(transaction) {
    fetch('https://api-ahtaxdhvbo.now.sh/transactions/returned', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ transaction })
    }) 
      .then(res => res.json())
      .then(msg => {
        console.log(msg)
        this.getTransactionFromAPI()
        this.props.getInventory()
      })
      .catch(err => console.log(err))
  }
  getTransactionFromAPI() {
    fetch('https://api-ahtaxdhvbo.now.sh/transactions') 
      .then(res => res.json())
      .then(transactions => {
        this.setState({ transactions })
      })
      .catch(err => console.log(err))
  }
  getCustomerFromAPI(phoneNumber) {
    fetch(`https://api-ahtaxdhvbo.now.sh/customers/${phoneNumber}`) 
      .then(res => res.json())
      .then(customer => {
        this.setState({ customer })
      })
      .catch(err => console.log(err))
  }
  async getCustomerName(phoneNumber) {
    const customer = await this.getCustomerFromAPI(phoneNumber)
    return (
      <span>{customer.name}</span> 
    )
  }
  componentDidMount() {
    this.getTransactionFromAPI()
  }
  render() {
    const transactions = this.state.transactions || []
    return (
      <React.Fragment>
        <h2>Transaction Table</h2>

          <table className="table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Items</th>
                <th>Collateral</th>
                <th>Controls</th>
              </tr>
            </thead>
            <tbody>
              {
                transactions.map((transaction, i) => (
                  <tr key={i}>
                    <td>{transaction.customer}</td>
                    <td><ItemDropdown items={transaction.items} inventory={this.props.inventory} /></td>
                    <td>{transaction.collateral}</td>
                    <td>
                      <div className="btn-group">
                        <button 
                          className="btn btn-success" 
                          type="button"
                          onClick={this.handleReturn.bind(this, transaction.id)}
                          disabled={transaction.timeReturned}
                        >Return</button>
                        <button 
                          className="btn btn-danger" 
                          type="button"
                          onClick={this.handleDelete.bind(this, transaction.id)}
                          disabled={!transaction.timeReturned}
                        >Delete</button>
                        <button
                          className="btn btn-info"
                          type="button"
                          onClick={this.handleEdit.bind(this, transaction.id)}
                        >Edit</button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>

      </React.Fragment>
    )
  }
}

export default TransactionTable
