import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import TransactionHistory from './Components/TransactionHistory';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/TransactionHistory" component={TransactionHistory} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
