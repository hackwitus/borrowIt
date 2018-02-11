import React from 'react';

class ItemDropdown extends React.Component {
  render() {
    return (
      <div className="btn-group">
        <button 
          type="button" 
          className="btn btn-primary dropdown-toggle"
          data-toggle="dropdown"
        >3 Items</button>
        <div className="dropdown-menu">
          <span className="dropdown-item">Arudino Uno</span>
          <span className="dropdown-item">Raspberry Pi 0</span>
          <span className="dropdown-item">ASUS Monitor</span>
        </div>
      </div>
    )
  }
}

export default ItemDropdown