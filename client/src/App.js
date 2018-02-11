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
  }

  componentDidMount() {
    //fetch inventory
    this.setState({
      inventory: [
        {
          id: "01",
          name: "Raspberry Pi",
          description: "Mini computer",
          quantity: 2,
          owner: "MLH"
        },
        {
          id: "02",
          name: "Arduino Uno",
          description: "Mini computer",
          quantity: 0,
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
    this.setState({
      cart: [ ...this.state.cart, item ],
      inventory: newInventory
    })
    console.log(item)
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-8">
            <InventoryView onAddItemToCart={this.handleAddItemToCart} inventory={this.state.inventory}/>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-4">
            <div className="row">
              <div className="col-md-6 col-lg-12">
                <Cart updateCart={this.state.cart}/>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-12">
                <Checkout cart={[
                  {
                    id: 'abc123',
                    name: 'Raspberry Pi 3'
                  },
                  {
                    id: 'def456',
                    name: 'Arduino Uno'
                  }
                ]}/>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
