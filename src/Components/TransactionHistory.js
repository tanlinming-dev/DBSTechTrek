import React from 'react';

import axios from 'axios';

export default class TransactionHistory extends React.Component {
  state = {
    transactions:
      [
        {
          "eGift": false,
          "dateTime": "2020-11-02T19:45:39.152Z",
          "custID": 1,
          "expensesCat": "Transport",
          "amount": 203.03,
          "message": "",
          "payeeID": 17
        },
        {
          "eGift": false,
          "dateTime": "2020-06-12T11:42:39.892Z",
          "custID": 1,
          "expensesCat": "Food",
          "amount": 304.23,
          "message": "",
          "payeeID": 17
        },
        {
          "eGift": false,
          "dateTime": "2020-05-27T07:19:23.804Z",
          "custID": 17,
          "expensesCat": "Insurance",
          "amount": 978.45,
          "message": "",
          "payeeID": 23
        },
        {
          "eGift": false,
          "dateTime": "2020-06-18T21:16:24.061Z",
          "custID": 17,
          "expensesCat": "Insurance",
          "amount": 323.67,
          "message": "",
          "payeeID": 19
        },
        {
          "eGift": true,
          "dateTime": "2020-10-31T14:55:50.105Z",
          "custID": 17,
          "expensesCat": "Food",
          "amount": 139.95,
          "message": "Thanks. :)",
          "payeeID": 13
        },
        {
          "eGift": false,
          "dateTime": "2020-04-20T18:34:30.993Z",
          "custID": 17,
          "expensesCat": "Transport",
          "amount": 100.62,
          "message": "",
          "payeeID": 21
        },
        {
          "eGift": false,
          "dateTime": "2020-02-06T04:24:02.061Z",
          "custID": 24,
          "expensesCat": "Transport",
          "amount": 855.71,
          "message": "",
          "payeeID": 17
        },
        {
          "eGift": true,
          "dateTime": "2020-04-15T16:05:20.295Z",
          "custID": 14,
          "expensesCat": "Entertainment",
          "amount": 652.09,
          "message": "Thanks. :)",
          "payeeID": 17
        },
        {
          "eGift": false,
          "dateTime": "2019-12-18T18:54:42.628Z",
          "custID": 17,
          "expensesCat": "Entertainment",
          "amount": 940.42,
          "message": "",
          "payeeID": 20
        },
        {
          "eGift": true,
          "dateTime": "2020-07-22T23:41:47.417Z",
          "custID": 3,
          "expensesCat": "Shopping",
          "amount": 249.44,
          "message": "Thanks. :)",
          "payeeID": 17
        },
        {
          "eGift": true,
          "dateTime": "2019-12-09T15:49:27.195Z",
          "custID": 1,
          "expensesCat": "Food",
          "amount": 203.54,
          "message": "Thanks. :)",
          "payeeID": 17
        },
        {
          "eGift": true,
          "dateTime": "2020-02-03T14:27:05.269Z",
          "custID": 17,
          "expensesCat": "Shopping",
          "amount": 744.12,
          "message": "Thanks. :)",
          "payeeID": 10
        },
        {
          "eGift": true,
          "dateTime": "2020-04-13T16:58:21.970Z",
          "custID": 17,
          "expensesCat": "Entertainment",
          "amount": 989.93,
          "message": "Thanks. :)",
          "payeeID": 10
        },
        {
          "eGift": false,
          "dateTime": "2020-11-26T10:44:47.181Z",
          "custID": 17,
          "expensesCat": "Transport",
          "amount": 451.33,
          "message": "",
          "payeeID": 12
        }
      ]
  }

  componentDidMount() {

    const config = {
      headers: {
        'x-api-key': 'ttP2UvBYv87loHrose0BX6WnjdqGwRl78QQMtuYy',
      }
    };

    const info = {
      'custId': 17
    }

    axios.post(`https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/transaction/view`,
      info, config)
      .then(res => {
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
              <th>custId</th>
              <th>payeeId</th>
              <th>date</th>
              <th>amount</th>
              <th>eGift</th>
              <th>message</th>
              <th>expensesCat</th>
            </tr>
          </thead>
          <tbody>
          { this.state.transactions.map(transaction => 
            <tr>
              <td>{transaction.custId}</td>
              <td>{transaction.payeeId}</td>
              <td>{transaction.date}</td>
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
