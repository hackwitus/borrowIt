import React from 'react';
import TransactionTable from './admin/TransactionTable'
import AdminInventoryTable from './admin/AdminInventoryTable'

class AdminView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      transactions: [],
      inventory: []
    }

    this.getTransactionsFromAPI = this.getTransactionsFromAPI.bind(this)
    this.getInventoryFromAPI = this.getInventoryFromAPI.bind(this)
  }

  getTransactionsFromAPI() {
    fetch('https://api-ahtaxdhvbo.now.sh/transactions')
      .then(res => res.json())
      .then(transactions => {
        this.setState({ transactions })
      })
      .catch(err => console.log(err))
  }
  getInventoryFromAPI() {
    fetch('https://api-ahtaxdhvbo.now.sh/inventory') 
      .then(res => res.json())
      .then(inventory => {
        this.setState({ inventory })
      })
      .catch(err => console.log(err))
  }
  componentDidMount() {
    this.getTransactionsFromAPI()
    this.getInventoryFromAPI()
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <AdminInventoryTable
              inventory={this.state.inventory}
              getInventory={this.getInventoryFromAPI}
            />
            <TransactionTable 
              transactions={this.state.transactions}  
              onReturnItems={this.handleReturnItems}
              inventory={this.state.inventory}
              getInventory={this.getInventoryFromAPI}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default AdminView
