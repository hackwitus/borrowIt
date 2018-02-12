import React from 'react';
import ItemDropdown from './ItemDropdown';

class TransactionTable extends React.Component {
  constructor(props) {
    super(props)

    this.renderTable = this.renderTable.bind(this)
  }

  renderTable() {
    const transactions = this.props.transactions || []
    return transactions.length > 0 ? (
      <table className="table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Items</th>
            <th>Collateral</th>
            <th>Return</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, i) => (
            <tr key={i}>
              <td>{transaction.customer}</td>
              <td><ItemDropdown items={transaction.items}/></td>
              <td>{transaction.collateral}</td>
              <td><button
                    className="btn btn-success"
                    onClick={this.handleReturnItems.bind(this, transaction)}
                  >Return
                  </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
    ) : (
      <p>Your table is empty.</p>
    )
  }

  handleReturnItems(transaction, e) {
    console.log(transaction)
    this.props.onReturnItems(transaction)
  }

  render() {
    return (
      <React.Fragment>
        { this.renderTable() }
      </React.Fragment>
    )
  }
}

export default TransactionTable
