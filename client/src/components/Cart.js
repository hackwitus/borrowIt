import React from 'react';

class Cart extends React.Component {
  handleRemoveItemFromCart(item, e) {
    this.props.onRemoveItemFromCart(item)
  }
  render() {
    const cart = this.props.cart
    return (
      <div>
        <h2>Your Cart</h2>
        {cart.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Quantity</th>
                <th scope="col">Name</th>
                <th scope="col">Owner</th>
                <th scope="col">Remove From Cart</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, i) => (
                <tr key={i}>
                  <th>{item.quantity}</th>
                  <td>{item.name}</td>
                  <td>{item.owner}</td>
                  <th>
                    <button
                      className="btn btn-danger"
                      onClick={this.handleRemoveItemFromCart.bind(this, item)}
                    >
                      <span className="oi oi-minus"></span>
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    )
  }
}

export default Cart
