import React from 'react';

class Cart extends React.Component {
  render() {
    return (
      <div>
        <h3>Items in your cart</h3>
        <ul>
          <li>Raspberry Pi 3</li>
          <li>Arduino Uno</li>
        </ul>
      </div>
    )
  }
}

export default Cart