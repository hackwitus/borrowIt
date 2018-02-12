import React from 'react'
import AddInventoryForm from './AddInventoryForm'

class AdminInventoryTable extends React.Component {
  constructor(props) {
    super(props)

    this.renderTable = this.renderTable.bind(this)
    this.handleAddItemToTable = this.handleAddItemToTable.bind(this)
  }

  handleAddItemToTable(item, e) {
    fetch('https://api-ahtaxdhvbo.now.sh/inventory/new', {
      method: "POST",
      "headers": {
        "content-type": "application/json"
      },
      "body": JSON.stringify({
        name: item.item_name,
        description: item.item_description,
        owner: item.item_owner,
        quantity: item.item_quantity
      })
    }) 
      .then(res => res.json())
      .then(message => {
        console.log(message)
        this.props.getInventory()
      })
      .catch(err => console.log(err))
  }

  handleDeleteItemFromTable(itemId, e) {
    fetch('https://api-ahtaxdhvbo.now.sh/inventory/delete', {
      method: "POST",
      "headers": {
        "content-type": "application/json"
      },
      "body": JSON.stringify({
        id: itemId
      })
    }) 
      .then(res => res.json())
      .then(message => {
        console.log(message)
        this.props.getInventory()
      })
      .catch(err => console.log(err))
  }

  handleEditItemInTable(item, e) {
    console.log('Okie dokie!')
  }

  renderTable() {
    const items = this.props.inventory || []
    return (
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Owner</th>
            <th scope="col">Quantity</th>
            <th scope="col">Controls</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} >
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.owner}</td>
              <th><span className={item.quantity === 0 ? 'text-danger' : 'text-success'}>{item.quantity}</span></th>
              <td>
                <div className="btn-group">
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={this.handleDeleteItemFromTable.bind(this, item.id)}
                  >Delete</button>
                  <button
                    className="btn btn-info"
                    type="button"
                    onClick={this.handleEditItemInTable.bind(this, item)}
                  >Edit</button>
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={5}>
              <AddInventoryForm onAddItem={this.handleAddItemToTable}/>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

  render() {
    return (
      <React.Fragment>
        <h2>Admin Inventory Table</h2>
        <div className="table-responsive">
          { this.renderTable() }
        </div>
      </React.Fragment>
    )
  }
}

export default AdminInventoryTable