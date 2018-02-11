import React from 'react';

var width = {
  width: '100%',
  textAlign: 'center',
};

var i = -1;

const addItem = addItemToCart => {
  return "a"
}

const renderTable = items => {
  console.log(items)
  return items ?  (
    <table style={width}>
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
      {items.map(item => (
        <tr>
          <th scope="row">{i++}</th>
          <th scope="row"><button>-</button></th>
          <th scope="row">{item.quantity}</th>
          <th scope="row"><button onClick={this.quantity + 1}>+</button></th>
          <td><span className={item.quantity > 0 ? ("oi oi-check text-success") : ("oi oi-x text-danger")}></span></td>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>{item.owner}</td>
        </tr>
      ))}
    </table>
  ) : (
    <p>Your table is empty.</p>
  )
}

class InventoryTable extends React.Component {
  render() {
    return (
      <div>
        { renderTable(this.props.inventoryItems) }
        { addItem(this.props.tableFunctions) }
      </div>
    )
  }
}

export default InventoryTable
