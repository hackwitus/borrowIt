import React, { Component } from 'react';
import Navbar from './components/Navbar';
import CustomerView from './components/CustomerView';
import AdminView from './components/AdminView';
import Auth from './Auth';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false,
      auth: new Auth()
    }
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }
  login(creds, cb) {
    this.state.auth.verify(this.state.auth.sign(creds))
      .then(() => this.setState({
        isAuthenticated: true
      }))
      .catch((err) => {
        console.log(err)
        cb(err)
      })
  }
  logout() {
    this.setState({
      isAuthenticated: false
    })
  }
  render() {
    return (
      <React.Fragment>
        <Navbar
          isAuthenticated={this.state.isAuthenticated}
          onLogin={this.login}
          onLogout={this.logout}
        />
        {this.state.isAuthenticated ? (
          <AdminView />
        ) : (
          <CustomerView />
        )}
      </React.Fragment>
    );
  }
}

export default App;
