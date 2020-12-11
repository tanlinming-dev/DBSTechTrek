import React, { Component } from 'react';
import '../App.css';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <a href="./ViewBalance">Home</a>
        <a href="./AddTransaction">Add Transaction</a>
        <a href="./TransactionHistory">Transaction History</a>
        <a href="#" className="right">Sign out</a>
      </div>
    );
  }
}
 
export default Navbar
