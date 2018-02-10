import React from 'react'

class InventoryTable extends React.Component {
  render() {
    return (
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Available</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Owner</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td><span className="oi oi-check text-success"></span></td>
            <td>Raspberry Pi 3</td>
            <td>Tastiest mini computer</td>
            <td>MLH</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td><span className="oi oi-check text-success"></span></td>
            <td>Arduino Uno</td>
            <td>Powerful mini computer</td>
            <td>TechSandbox</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default InventoryTable