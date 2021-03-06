import React from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Session from './Session';
import Navbar from './Navbar';
class ViewBalance extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        custID: 17,
        payeeID: '',
        dateTime: new Date(),
        amount: 0.0,
        expensesCat: '',
        eGift: false,
        message: '',
        payeeIDError: '',
        dateTimeError: '',
        amountError: '',
        expensesCatError: '',
        messageError: '',
        balanceAmount: 0,
        payees: {},
        error: "",
        accounts:[],
      };
    }

  componentDidMount() {
    this.checkAmountBalance();
  }

  checkAmountBalance() {
		var data = JSON.stringify({
			custID: sessionStorage.getItem('custID'),
		});
		axios({
        method: 'post',
        url: 'https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/accounts/view',
        headers: {
          'x-api-key': 'ttP2UvBYv87loHrose0BX6WnjdqGwRl78QQMtuYy',
          'Content-Type': 'application/json',
        },
        data: data,
      })
        .then((response) => response)
        .catch((error) => error.response)
        .then((response) => {
          if (response.status === '200' || response.status === 200) {
            let accounts = response.data;
            for (let i = 0; i < accounts.length; i++) {
              if (accounts[i]['linked'] == true) {
                accounts[i]['islinked'] = 'Yes';
              }
              else {
                accounts[i]['islinked'] = 'No';
              }
            }
            
            this.setState({ accounts: accounts });
            console.log(accounts)
          }
        });
    }

  render() {
    return (
      <div>
        <Navbar/><Session/>
        <h2>Account Details</h2>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th><h5>Account Name</h5></th>
              <th><h5>Account Number</h5></th>
              <th><h5>Available Balance (SGD)</h5></th>
              <th><h5>Is Linked?</h5></th>
            </tr>
          </thead>
          <tbody>
          { this.state.accounts.map(account => 
            <tr key="{accounts.key}">
              <td>{account.accountName}</td>
              <td>{account.accountNumber}</td>
              <td>${account.availableBal}</td>
              <td>{account.islinked}</td>
            </tr>
            )
          }
          </tbody>
        </Table>
      </div>
    )
  }
}

export default ViewBalance;


