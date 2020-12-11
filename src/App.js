import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import ViewBalance from './Components/ViewBalance';
import TransactionHistory from './Components/TransactionHistory';
import AddTransaction from './Components/AddTransaction';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={ViewBalance} />
          <Route path="/AddTransaction" component={AddTransaction} />
          <Route path="/TransactionHistory" component={TransactionHistory} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;