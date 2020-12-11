import './App.css';
import Home from './Components/Home';
import ViewBalance from './Components/ViewBalance';
import TransactionHistory from './Components/TransactionHistory';
import AddTransaction from './Components/AddTransaction';
import Loginpage from './Components/Loginpage';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import React, { useState } from 'react';
import PrivateRoute from './Components/PrivateRoute';
// export const AuthContext = React.createContext(null);

function App() {
	// const [isLoggedIn, setLoggedIn] = useState(false);
	const isLogin = () => {
		return sessionStorage.getItem('isLoggedIn') === 'true' ? true : false;
	};

	let routes;

	routes = (
		<Switch>
			<PrivateRoute path="/home" component={ViewBalance} />
			<PrivateRoute path="/AddTransaction" component={AddTransaction} />
			<PrivateRoute path="/TransactionHistory" component={TransactionHistory} />
      <Route exact path='/login' component={Loginpage} />
			<Route exact path="/">
				<Redirect to="/login" />
			</Route>
		</Switch>
	);
	/*
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
*/
	return (
		// <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
		<div className="App">
			<Router>{routes}</Router>
		</div>
		// </AuthContext.Provider >
	);
}

export default App;