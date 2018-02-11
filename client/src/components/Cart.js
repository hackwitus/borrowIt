import React from 'react';


const renderCart = items => {
  console.log(items)
  return items.length > 0 ? (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Quantity</th>
          <th scope="col">Name</th>
          <th scope="col">Owner</th>
          <th scope="col">-</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => (
          <tr key={i}>
            <th scope="row">{item.quantity}</th>
            <td>{item.name}</td>
            <td>{item.owner}</td>
            <th scope="row"><button> - </button></th>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>Your cart is empty.</p>
  )
}

class Cart extends React.Component {
  render() {
    return (
      <div>
        <h3>Items in your cart</h3>
        { renderCart(this.props.updateCart) }
      </div>
    )
  }
}

export default Cart
