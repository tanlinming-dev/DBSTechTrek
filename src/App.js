import './App.css';
import Home from './Components/Home';
import TransactionHistory from './Components/TransactionHistory';
import AddTransaction from './Components/AddTransaction';
import Loginpage from './Components/Loginpage';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import React, { useState } from 'react'

// export const AuthContext = React.createContext(null);

function App() {

  // const [isLoggedIn, setLoggedIn] = useState(false);
  sessionStorage.setItem("isLoggedIn", false)

  let routes;

  if (sessionStorage.getItem("isLoggedIn") == true) {
    routes = (
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/AddTransaction" component={AddTransaction} />
        <Route path="/TransactionHistory" component={TransactionHistory} />
        <Redirect to="/home" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path='/login' component={Loginpage} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    )
  }

  return (
    // <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
    <div className="App">
      <Router>
        {routes}
      </Router>
    </div>
    // </AuthContext.Provider >
  );
}

export default App;
