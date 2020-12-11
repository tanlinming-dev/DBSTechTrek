import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
class AddTransaction extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			custID: 7,
			payeeID: '',
			dateTime: new Date(),
			amount: '',
			expensesCat: '',
			eGift: false,
			message: '',
			payeeIDError: '',
			dateTimeError: '',
			amountError: '',
			expensesCatError: '',
			messageError: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		/*
		var formData = new FormData();
		formData.append('username', 'Group17');
		formData.append('username', 'ldQPUCjNtwzsx52');
		axios
			.post(
				'https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/login',
				JSON.stringify({ username: 'Group17', password: 'ldQ' }),
				{
					headers: {
						"x-api-key": 'ttP2UvBYv87loHrose0BX6WnjdqGwRl78QQMtuYy',
					},
				}
			)
			.then((response) => response)
			.catch((error) => error.response)
			.then((response) => {
				console.log(response.status);

				if (response.status === '200' || response.status === 200) {
				}
			});
		var axios = require('axios');
		var data = JSON.stringify({ username: 'Group17', password: 'ldQ' });

		var config = {
			method: 'post',
			url: 'https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/login',
			headers: {
				'x-api-key': 'ttP2UvBYv87loHrose0BX6WnjdqGwRl78QQMtuYy',
				'Content-Type': 'application/json',
			},
			data: data,
		};

		axios(config)
			.then(function (response) {
				console.log(JSON.stringify(response.data));
			})
			.catch(function (error) {
				console.log(error);
			});
			*/
	}

	// Handle PayyeeID changes
	handlePayeeID = (e) => {
		this.setState({ payeeID: parseInt(e.target.value) });
	};

	// Handle Express Category Change
	handleExpensesCatChange = (e) => {
		this.setState({ expensesCat: e.target.value });
	};

	// Handle Message Change
	handleMessageChange = (e) => {
		this.setState({ message: e.target.value });
	};

	// Handle Check Box Change
	handleCheckBoxChange = (e) => {
		if (e.target.checked) {
			this.setState({ [e.target.name]: true });
		} else {
			this.setState({ [e.target.name]: false });
		}
	};


	// Handle Amount Change
	handleAmountChange = (e) => {
		this.setState({ amount: parseInt(e.target.value) });
	}
	handleSubmit(event) {
		event.preventDefault();

		console.log(this.state);
		var data = JSON.stringify({
			custID: this.state.custID,
			payeeID: this.state.payeeID,
			dateTime: this.state.dateTime,
			amount: this.state.amount,
			eGift: this.state.eGift,
			message: this.state.message,
			expensesCat: this.expensesCat
		});

		console.log(data);
		axios({
			method: 'post',
			url: 'https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/transaction/add',
			headers: {
				'x-api-key': 'ttP2UvBYv87loHrose0BX6WnjdqGwRl78QQMtuYy',
				'Content-Type': 'application/json',
			},
			data: data,
		})
			.then((response) => response)
			.catch((error) => error.response)
			.then((response) => {
				console.log(response);
				console.log(response.status);

				if (response.status === '200' || response.status === 200) {
				}
			});
	}

	render() {
		return (
			<div>
				<Form onSubmit={this.handleSubmit}>
					<Form.Group>
						<Form.Label>Payee ID</Form.Label>
						<Form.Control
							type="number"
							name="payeeID"
							placehoder="Enter PayeeID"
							onChange={this.handlePayeeID}
							defaultValue={this.state.payeeID}
							className={this.state.payeeIDError.length > 0 ? 'not-valid' : ''}
						/>

						{this.state.payeeIDError ? <div class="error">{this.state.payeeIDError}</div> : null}
					</Form.Group>

					<Form.Group>
						<Form.Label>Amount</Form.Label>
						<Form.Control
							type="number"
							name="amount"
							placehoder="Enter Amount"
							onChange={this.handleAmountChange}
							defaultValue={this.state.amount}
							className={this.state.amountError.length > 0 ? 'not-valid' : ''}
						/>

						{this.state.amountError ? <div class="error">{this.state.amountError}</div> : null}
					</Form.Group>

					<Form.Group>
						<Form.Label>Expenses Category</Form.Label>
						<Form.Control
							type="text"
							name="expensesCat"
							placehoder="Enter Expenses Category"
							onChange={this.handleExpensesCatChange}
							defaultValue={this.state.expensesCat}
							className={this.state.expensesCatError.length > 0 ? 'not-valid' : ''}
						/>

						{this.state.expensesCatError ? <div class="error">{this.state.expensesCatError}</div> : null}
					</Form.Group>
					<Form.Group controlId="formBasicCheckbox">
						<Form.Check
							type="checkbox"
							name="eGift"
							label="Gift?"
							onChange={this.handleCheckBoxChange}
							checked={this.state.eGift}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Message</Form.Label>
						<Form.Control
							type="text"
							name="message"
							placehoder="Enter Message"
							onChange={this.handleMessageChange}
							defaultValue={this.state.message}
							className={this.state.messageError.length > 0 ? 'not-valid' : ''}
						/>

						{this.state.messageError ? <div class="error">{this.state.messageError}</div> : null}
					</Form.Group>
					<Button variant="primary" type="submit">
						Add Transaction
					</Button>
					<Form.Text id="error" style={{ color: 'red' }}>
						{this.state.error}
					</Form.Text>
				</Form>
			</div>
		);
	}
}

export default AddTransaction;
