import React from 'react';
import AdminLoginForm from './admin/AdminLoginForm';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand text-info">BorrowIt</span>
        {this.props.isAuthenticated ? (
          <button 
            className="btn btn-success"
            onClick={this.props.onLogout}
          >Logout</button>
        ) : (
          <AdminLoginForm onLogin={this.props.onLogin} />
        )}
      </nav>
    )
  }
}

export default Navbar