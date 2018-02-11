import React from 'react';
import ItemDropdown from './ItemDropdown';

class TransactionTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        {
          "name": "Arduino Uno"
        },
        {
          "name": "Raspberry Pi 0"
        },
        {
          "name": "ASUS Monitor"
        }
      ]
    }
  }
  render() {
    return (
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
          <tr>
            <td>Ethan Arrowood</td>
            <td><ItemDropdown items={this.state.items}/></td>
            <td>Student ID ending in 4367</td>
            <td><button className="btn btn-success">Return</button></td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default TransactionTable