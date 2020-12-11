import React from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

export default class TransactionHistory extends React.Component {
  state = {
    transactions: [],
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

    axios.post(`https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/transaction/view`,
      info, config)
      .then(res => {
        console.log(res.data)
        const transactions = res.data;
        this.setState({ transactions });
      })
  }

  render() {
    return (
      <div>
        <h1>Transaction History</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Payee ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Is eGift?</th>
              <th>Message</th>
              <th>Expenses Category</th>
            </tr>
          </thead>
          <tbody>
          { this.state.transactions.filter(transaction => transaction.custID === 17).map(transaction => 
            <tr key="{transaction.date}">
              <td>{transaction.payeeID}</td>
              <td>{Date(transaction.dateTime)}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.eGift}</td>
              <td>{transaction.message}</td>
              <td>{transaction.expensesCat}</td>
            </tr>
            )
          }
          </tbody>
        </Table>
      </div>
    )
  }
}
