import React from 'react';
import TransactionTable from './TransactionTable'

class AdminView extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <TransactionTable />
          </div>
        </div>
      </div>
    )
  }
}

export default AdminView