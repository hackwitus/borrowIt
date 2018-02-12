import React from 'react';

class ItemDropdown extends React.Component {
  render() {
    const items = this.props.items.split(',') || []
    const invDict = this.props.inventory.reduce((acc, item) => {
      return {
        ...acc,
        [item.id]: item.name
      }
    }, {})
    return items.length > 0 ? (
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-primary dropdown-toggle"
          data-toggle="dropdown"
        >{items.length} Items</button>
        <div className="dropdown-menu">
          {items.map((item, i) => (
            <span key={i} className="dropdown-item">{invDict[item]}</span>
          ))}
        </div>
      </div>
    ) : (
      <p>This transaction is empty</p>
    )
  }
}

export default ItemDropdown
