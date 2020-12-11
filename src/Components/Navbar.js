import React, { Component } from 'react';
 
class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <a href="#">Home</a>
        <br/>
        <a href="#">Add Transaction</a>
        <br/>
        <a href="#">Transaction History</a>
        <br/>
        <a href="#" className="right">Sign Out</a>
      </div>
    );
  }
}
 
export default Navbar
