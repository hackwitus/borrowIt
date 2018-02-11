import React, { Component } from 'react';
import Checkout from './components/Checkout';
import Cart from './components/Cart';
import InventoryView from './components/InventoryView';

require('bootstrap')
require('../node_modules/bootstrap/dist/css/bootstrap.min.css')

function addItemToCart(item) {
  console.log(item)
}

function handleAddItem(item) {

}

function handleRemoveItem(item) {

}

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 col-lg-8">
            <InventoryView inventoryItems={[
              {
                id: "01",
                name: "Raspberry Pi",
                description: "Mini computer",
                quantity: 2,
                owner: "MLH"
              },
              {
                id: "02",
                name: "Raspberry Pi 2",
                description: "Mini computer",
                quantity: 0,
                owner: "IEEE"
              }
            ]}
            tableFunctions={
              addItemToCart()
            }/>
          </div>
          <div className="col-md-12 col-lg-4">
            <div className="row">
              <div className="col-md-6 col-lg-12">
                <Cart />
              </div>
              <div className="col-md-6 col-lg-12">
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
