import React, { Component } from 'react';
import Checkout from './Checkout';

require('bootstrap')
require('../node_modules/bootstrap/dist/css/bootstrap.min.css')

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-lg-4">
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
    );
  }
}

export default App;
