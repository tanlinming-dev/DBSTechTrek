import React from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

class ViewBalance extends React.Component {
  state = {
    accounts: [],
  }

  componentDidMount() {

    const config = {
      headers: {
        'x-api-key': 'ttP2UvBYv87loHrose0BX6WnjdqGwRl78QQMtuYy',
      }
    };

    const info = {
      'custID': 17
    }

    axios.post(`https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/accounts/view`,
      info, config)
      .then(res => {
        console.log(res.data)
        const accounts = res.data;
        this.setState({ accounts });
        console.log(accounts);
      })
  }

  render() {
    return (
      <div>
        <h2>Account Details</h2>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Account Name</th>
              <th>Account Number</th>
              <th>Available Balance</th>
              <th>Is Linked?</th>
            </tr>
          </thead>
          <tbody>
          { this.state.accounts.filter(account => account.custID === 17).map(account => 
            <tr key="{accounts.accountName}">
              <td>{account.accountName}</td>
              <td>{account.accountNumber}</td>
              <td>{account.availableBal}</td>
              <td>{account.linked}</td>
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
