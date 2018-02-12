import React from 'react';
import Checkout from './customer/Checkout';
import Cart from './customer/Cart';
import InventoryView from './customer/InventoryView';
import 'whatwg-fetch'

class CustomerView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cart: [],
      inventory: []
    }

    this.handleAddItemToCart = this.handleAddItemToCart.bind(this)
    this.handleRemoveItemFromCart = this.handleRemoveItemFromCart.bind(this)
    this.handleTransactionSuccess = this.handleTransactionSuccess.bind(this)
    this.getInventoryFromAPI = this.getInventoryFromAPI.bind(this)
  }

  getInventoryFromAPI() {
    fetch('https://api-ahtaxdhvbo.now.sh/inventory') 
      .then(res => res.json())
      .then(inventory => {
        this.setState({ inventory })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    //fetch inventory
    this.getInventoryFromAPI()
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

  handleTransactionSuccess() {
    this.getInventoryFromAPI()
    this.setState({
      cart: []
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
                <Checkout cart={this.state.cart} onTransactionSuccess={this.handleTransactionSuccess}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerView