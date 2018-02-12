import React from 'react'

class AdminInventoryTable extends React.Component {
  constructor(props) {
    super(props)

    this.renderTable = this.renderTable.bind(this)
  }

  renderTable() {
    const items = this.props.inventory || []
    return items.length > 0 ? (
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
                    onClick={this.handleDeleteItemFromTable.bind(this, item)}
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
            <td><input type="text" name="name" placeholder="Name" /></td>
            <td><input type="text" name="description" placeholder="Description" /></td>
            <td><input type="text" name="owner" placeholder="Owner" /></td>
            <td><input type="text" name="quantity" placeholder="Quantity" /></td>
            <td>
              <div className="btn-group">
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={this.handleAddItemToTable.bind()}
                >Add Item</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    ) : (
      <p>Your table is empty.</p>
    )
  }

  handleAddItemToTable(item, e) {
    console.log('Youve got it boss!')
  }

  handleDeleteItemFromTable(item, e) {
    console.log('Sure thing!')
  }

  handleEditItemInTable(item, e) {
    console.log('Okie dokie!')
  }

  render() {
    console.log(this.props.inventory)
    return (
      <React.Fragment>
        <h2>Admin Inventory Table</h2>
        { this.renderTable() }
      </React.Fragment>
    )
  }
}

export default AdminInventoryTable
