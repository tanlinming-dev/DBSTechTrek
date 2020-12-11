import React from 'react';

import axios from 'axios';

export default class TransactionHistory extends React.Component {
  state = {
    transactions: []
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
      <h1>temp</h1>
    )
  }
}
