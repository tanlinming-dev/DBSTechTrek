import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import TransactionHistory from './Components/TransactionHistory';
import AddTransaction from './Components/AddTransaction';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Session from './Components/Session';
function App() {
  return (
    <Router>
    <div className="App">
        <Navbar />
        <Session />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/AddTransaction" component={AddTransaction} />
          <Route path="/TransactionHistory" component={TransactionHistory} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
