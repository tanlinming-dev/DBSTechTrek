import React from 'react';
import { useHistory } from 'react-router-dom';

function Navbar() {

  const history = useHistory();

  const handleLogout = () => {
    sessionStorage.clear();
    history.push("/login")
  }

  return (
    <div className="navbar">
      <a href="./Home">Home</a>
      <br />
      <a href="./AddTransaction">Add Transaction</a>
      <br />
      <a href="./TransactionHistory">Transaction History</a>
      <br />
      <a className="right" onClick={handleLogout}>Sign Out</a>
    </div>
  );
}

export default Navbar;
