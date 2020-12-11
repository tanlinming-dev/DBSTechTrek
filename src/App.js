import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TransactionHistory from './components/TransactionHistory';
import AddTransaction from './components/AddTransaction';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
        <Navbar />
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
