import '../App.css';
import Navbar from './Navbar';
import ViewBalance from './ViewBalance';
import TransactionHistory from './TransactionHistory';
import AddTransaction from './AddTransaction';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function Home() {
  return (
    <div className="App">
        <Router>
            <Navbar />
            <Switch>
                <Route path="/ViewBalance" exact component={ViewBalance} />
                <Route path="/AddTransaction" component={AddTransaction} />
                <Route path="/TransactionHistory" component={TransactionHistory} />
            </Switch>
        </Router>
      </div>
  );
}

export default Home;
