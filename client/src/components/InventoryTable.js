import React from 'react';

class InventoryTable extends React.Component {
  constructor(props) {
    super(props)

    this.renderTable = this.renderTable.bind(this)
  }

  renderTable() {
    const items = this.props.inventoryItems || []
    return items.length > 0 ?  (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">-</th>
            <th scope="col">Quantity</th>
            <th scope="col">+</th>
            <th scope="col">Available</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Owner</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <th scope="row">{i}</th>
              <th scope="row"><button> - </button></th>
              <th scope="row">{item.quantity}</th>
              <th scope="row"><button onClick={this.handleAddItem.bind(this, item)}>+</button></th>
              <td><span className={item.quantity > 0 ? ("oi oi-check text-success") : ("oi oi-x text-danger")}></span></td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>Your table is empty.</p>
    )
  }

  handleAddItem(item, e) {
    this.props.onAddItem(item)
  }

  render() {
    return (
      <div>
        { this.renderTable() }
      </div>
    )
  }
}

export default InventoryTable
