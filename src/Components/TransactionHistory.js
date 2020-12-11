import React from 'react';
import Table from 'react-bootstrap/Table';
import {Doughnut} from 'react-chartjs-2';
import axios from 'axios';
import Session from './Session';
import Navbar from './Navbar';
export default class TransactionHistory extends React.Component {
  state = {
    userTransactions: [],
    userExpenditureSum: [],
    overallAverageExpenditure: [],
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
        this.setState({ users })
      })

    axios.post(`https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/transaction/view`,
      info, config)
      .then(res => {
        const allTransactions = res.data
        let overallAverageExpenditure = [0, 0, 0, 0, 0, 0]
        allTransactions.forEach(transaction => {
          switch(transaction.expensesCat) {
            case "Insurance":
              overallAverageExpenditure[0] += transaction.amount
              break
            case "Transport":
              overallAverageExpenditure[1] += transaction.amount
              break
            case "Food":
              overallAverageExpenditure[2] += transaction.amount
              break
            case "Entertainment":
              overallAverageExpenditure[3] += transaction.amount
              break
            case "Shopping":
              overallAverageExpenditure[4] += transaction.amount
              break
            default:
              overallAverageExpenditure[5] += transaction.amount
          }
        })

        const userTransactions = res.data.filter(transaction => transaction.custID === 17);
        this.setState({ userTransactions });
        let userExpenditureSum = [0, 0, 0, 0, 0, 0]
        userTransactions.forEach(transaction => {
          let user = this.state.users.find(user => user.custID === transaction.payeeID)
          transaction['payeeName'] = user.firstName + " " + user.lastName

          switch(transaction.expensesCat) {
            case "Insurance":
              userExpenditureSum[0] += transaction.amount
              break
            case "Transport":
              userExpenditureSum[1] += transaction.amount
              break
            case "Food":
              userExpenditureSum[2] += transaction.amount
              break
            case "Entertainment":
              userExpenditureSum[3] += transaction.amount
              break
            case "Shopping":
              userExpenditureSum[4] += transaction.amount
              break
            default:
              userExpenditureSum[5] += transaction.amount
          }
        });

        overallAverageExpenditure = overallAverageExpenditure.map(x => x / this.state.users.length);

        this.setState({ overallAverageExpenditure })
        this.setState({ userExpenditureSum })

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
              data: userExpenditureSum
            }
          ]
        }})
      })
  }

  render() {
    return (
      <div>
        <Navbar/>,<Session/>
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
          { this.state.userTransactions.map(transaction => 
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
        <ul>
          <li>On <b>insurance</b>, you spend ${Math.abs(this.state.userExpenditureSum[0] - this.state.overallAverageExpenditure[0])}
          {this.state.userExpenditureSum[0] > this.state.overallAverageExpenditure[0]? ' more' : ' less'} than the average consumer.</li>
          <li>On <b>transport</b>, you spend ${Math.abs(this.state.userExpenditureSum[1] - this.state.overallAverageExpenditure[1])}
          {this.state.userExpenditureSum[1] > this.state.overallAverageExpenditure[1]? ' more' : ' less'} than the average consumer.</li>
          <li>On <b>food</b>, you spend ${Math.abs(this.state.userExpenditureSum[2] - this.state.overallAverageExpenditure[2])}
          {this.state.userExpenditureSum[2] > this.state.overallAverageExpenditure[2]? ' more' : ' less'} than the average consumer.</li>
          <li>On <b>entertainment</b>, you spend ${Math.abs(this.state.userExpenditureSum[3] - this.state.overallAverageExpenditure[3])}
          {this.state.userExpenditureSum[4] > this.state.overallAverageExpenditure[4]? ' more' : ' less'} than the average consumer.</li>
          <li>On <b>shopping</b>, you spend ${Math.abs(this.state.userExpenditureSum[5] - this.state.overallAverageExpenditure[5])}
          {this.state.userExpenditureSum[5] > this.state.overallAverageExpenditure[5]? ' more' : ' less'} than the average consumer.</li>
        </ul>
      </div>
    )
  }
}
