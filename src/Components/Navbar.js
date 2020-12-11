import React, { Component } from 'react';
 
class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <a href="./Home">Home</a>
        <br/>
        <a href="./AddTransaction">Add Transaction</a>
        <br/>
        <a href="./TransactionHistory">Transaction History</a>
        <br/>
        <a href="#" className="right">Sign Out</a>
      </div>
    );
  }
}
 
export default Navbar
