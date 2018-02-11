import React from 'react';

class InventoryTable extends React.Component {
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
            <th scope="col" className="text-center">Add To Cart</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} >
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.owner}</td>
              <th><span className={item.quantity === 0 ? 'text-danger' : 'text-success'}>{item.quantity}</span></th>
              <th className="text-center">
                <button 
                  className="btn btn-success"
                  onClick={this.handleAddItemToCart.bind(this, item)}
                  disabled={item.quantity === 0}
                >
                  <span className="oi oi-plus"></span>
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>Your table is empty.</p>
    )
  }

  handleAddItemToCart(item, e) {
    this.props.onAddItemToCart(item)
  }

  render() {
    return (
      <React.Fragment>
        <h2>Inventory Table</h2>
        { this.renderTable() }
      </React.Fragment>
    )
  }
}

export default InventoryTable
