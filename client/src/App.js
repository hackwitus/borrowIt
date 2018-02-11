import React, { Component } from 'react';
import Checkout from './components/Checkout';
import Cart from './components/Cart';
import InventoryView from './components/InventoryView';

require('bootstrap')
require('../node_modules/bootstrap/dist/css/bootstrap.min.css')

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cart: [],
      inventory: []
    }

    this.handleAddItemToCart = this.handleAddItemToCart.bind(this)
    this.handleRemoveItemFromCart = this.handleRemoveItemFromCart.bind(this)
  }

  componentDidMount() {
    //fetch inventory
    this.setState({
      inventory: [
        {
          id: "01",
          name: "Raspberry Pi",
          description: "Mini computer that does really cool thing. Why is this description so damn long.",
          quantity: 2,
          owner: "MLH"
        },
        {
          id: "02",
          name: "Arduino Uno",
          description: "Mini computer",
          quantity: 3,
          owner: "IEEE"
        }
      ]
    })

  }

  handleAddItemToCart(item) {
    const newInventory = this.state.inventory.map(
      invItem => invItem.id === item.id ?
        { ...invItem, quantity: invItem.quantity - 1 }
        : invItem
    )
    let didUpdateItemQuantity
    const newCart = this.state.cart.map(cartItem => {
      if (cartItem.id === item.id) {
        didUpdateItemQuantity = true
        return { ...cartItem, quantity: cartItem.quantity + 1 }
      } else return cartItem
    })
    if (!didUpdateItemQuantity) newCart.push({ ...item, quantity: 1 })
    this.setState({
      cart: newCart,
      inventory: newInventory
    })
  }

  handleRemoveItemFromCart(item) {
    const newInventory = this.state.inventory.map(
      invItem => invItem.id === item.id ?
        { ...invItem, quantity: invItem.quantity + 1 }
        : invItem
    )
    const newCart = this.state.cart.reduce((newCart, cartItem) => {
      if (cartItem.id === item.id) {
        return cartItem.quantity - 1 > 0 ? newCart.concat([{ ...cartItem, quantity: cartItem.quantity - 1 }]) : newCart
      } else return newCart.concat([cartItem])
    }, [])

    this.setState({
      cart: newCart,
      inventory: newInventory
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-7">
            <InventoryView onAddItemToCart={this.handleAddItemToCart} inventory={this.state.inventory}/>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-5">
            <div className="row">
              <div className="col-md-6 col-lg-12">
                <Cart cart={this.state.cart} onRemoveItemFromCart={this.handleRemoveItemFromCart} />
              </div>
              <div className="col-sm-12 col-md-6 col-lg-12">
                <Checkout cart={this.state.cart}/>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
