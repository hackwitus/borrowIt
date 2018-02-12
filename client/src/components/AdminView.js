import React from 'react';
import TransactionTable from './TransactionTable'

class AdminView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      transactions: []
    }

    this.getTransactionsFromAPI = this.getTransactionsFromAPI.bind(this)
    this.handleReturnItems = this.handleReturnItems.bind(this)
  }

  getTransactionsFromAPI() {
    fetch('https://api-ahtaxdhvbo.now.sh/transactions')
      .then(res => res.json())
      .then(transactions => {
        this.setState({ transactions })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getTransactionsFromAPI()
  }

  handleReturnItems(transaction) {
    const newTransactionTable = this.state.transactions.reduce((newTransactionTable, tableTransaction) => {
      if (tableTransaction.id === transaction.id) {
        return newTransactionTable
      }
    }, [])

    this.setState({
      transactions: newTransactionTable
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <TransactionTable transactions={this.state.transactions} onReturnItems={this.handleReturnItems}/>
          </div>
        </div>
      </div>
    )
  }
}

export default AdminView
