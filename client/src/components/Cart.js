import React from 'react';


const renderCart = items => {
  console.log(items)
  return items ? (
    <ul>
    {items.map(item => (
      <li>item.name</li>
    ))}
    </ul>
  ) : (
    <p>Your cart is empty.</p>
  )
}

class Cart extends React.Component {
  render() {
    return (
      <div>
        <h3>Items in your cart</h3>
        { renderCart(this.props.cartItems) }
      </div>
    )
  }
}

export default Cart
