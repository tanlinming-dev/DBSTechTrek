import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../App";

function Navbar() {

  const Auth = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    Auth?.setLoggedIn(false)
    history.push(`/`)
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

export default Navbar
