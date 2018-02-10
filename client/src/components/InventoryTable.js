import React from 'react';

var width = {
  width: '100%',
  textAlign: 'center',
};

const renderTable = items => {
  console.log(items)
  return items ?  (
    <table style={width}>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Available</th>
        <th scope="col">Name</th>
        <th scope="col">Description</th>
        <th scope="col">Owner</th>
      </tr>
      {items.map(item => (
        <tr>
          <th scope="row">{item.numberAvailable}</th>

          <td><span className={item.numberAvailable > 0 ? ("oi oi-check text-success") : ("oi oi-x text-danger")}></span></td>
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
      </div>
    )
  }
}

export default InventoryTable
