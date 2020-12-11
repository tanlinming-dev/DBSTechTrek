import React from 'react';
import Table from 'react-bootstrap/Table';
import {Bar, Doughnut} from 'react-chartjs-2';
import axios from 'axios';

export default class TransactionHistory extends React.Component {
  state = {
    transactions: [],
    chartData: {},
    users: []
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

    axios.post(`https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/users`, null, config)
      .then(res => {
        const users = res.data
        console.log(res.data)
        this.setState({ users })
      })

    axios.post(`https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/transaction/view`,
      info, config)
      .then(res => {
        const transactions = res.data;
        this.setState({ transactions });
        let expenditureSum = [0, 0, 0, 0, 0, 0]
        transactions.forEach(transaction => {
          let user = this.state.users.find(user => user.custID === transaction.custID)
          transaction['payeeName'] = user.firstName + " " + user.lastName

          switch(transaction.expensesCat) {
            case "Insurance":
              expenditureSum[0] += transaction.amount
              break
            case "Transport":
              expenditureSum[1] += transaction.amount
              break
            case "Food":
              expenditureSum[2] += transaction.amount
              break
            case "Entertainment":
              expenditureSum[3] += transaction.amount
              break
            case "Shopping":
              expenditureSum[4] += transaction.amount
              break
            default:
              expenditureSum[5] += transaction.amount
          }
        });

        console.log(transactions)

        this.setState({ chartData: { 
          labels: ['Insurance', 'Transport', 'Food', 'Entertainment', 'Shopping', 'Others'],
          datasets: [
            {
              label: 'Expenses',
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              data: expenditureSum
            }
          ]
        }})
      })
  }

  render() {
    return (
      <div>
        <h1>Transaction History</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Payee Name</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Is eGift?</th>
              <th>Message</th>
              <th>Expenses Category</th>
            </tr>
          </thead>
          <tbody>
          { this.state.transactions.filter(transaction => transaction.custID === 17).map(transaction => 
            <tr key={Math.random()}>
              <td>{transaction.payeeName}</td>
              <td>{Date(transaction.dateTime)}</td>
              <td>${transaction.amount}</td>
              <td>{transaction.eGift? 'Yes' : 'No'}</td>
              <td>{transaction.message}</td>
              <td>{transaction.expensesCat}</td>
            </tr>
            )
          }
          </tbody>
        </Table>
        <br />
        <h1>Expenses Breakdown by Category</h1>
        <Doughnut
          data={this.state.chartData}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: true
          }}
        />
        <br/>
      </div>
    )
  }
}
