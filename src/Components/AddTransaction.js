import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Datetime from 'react-datetime';

class AddTransaction extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			custID: '',
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
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.setState({custID: sessionStorage.getItem('custID')}, () =>{
			this.checkAmountBalance();
			this.getPayees();
			this.checkAmount(this.state.amount);
			this.checkExpensesCat(this.state.expensesCat);
			this.checkPayeeID(this.state.payeeID);
		});
		
	}

	checkAmountBalance() {
		var data = JSON.stringify({
			custID: this.state.custID,
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
					let balances = response.data;
					let balanceAmount = 0;
					for (let i = 0; i < balances.length; i++) {
						if (balances[i]['linked'] == true) {
							balanceAmount += parseFloat(balances[i]['availableBal']);
						}
					}
					
					this.setState({ balanceAmount: balanceAmount });
				}
			});
	}

	getPayees() {
		axios({
			method: 'post',
			url: 'https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/users',
			headers: {
				'x-api-key': 'ttP2UvBYv87loHrose0BX6WnjdqGwRl78QQMtuYy',
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response)
			.catch((error) => error.response)
			.then((response) => {
				if (response.status === '200' || response.status === 200) {
					console.log(response.data);
					let customers = response.data;
					let payees = {};
					for (let i = 0; i < customers.length; i++) {
						payees[customers[i]['custID']] = '';
					}
					this.setState({ payees: payees });
				}
			});
	}

	// Handle PayeeID changes
	handlePayeeID = (e) => {
		let payeeID = e.target.value;
		this.checkPayeeID(payeeID);
		
	};

	checkPayeeID(payeeID){
		console.log(payeeID);
		if (payeeID == NaN || payeeID == '') {
			this.setState({ payeeIDError: 'Please fill in payeeID!' });
		} else if (payeeID == this.state.custID) {
			this.setState({ payeeIDError: 'You cannot transfer to yourself! Please enter valid payeeID!' });
		} else {
			payeeID = parseInt(payeeID);
			//console.log(payeeID);
			//console.log(this.state.payees);
			if (!(payeeID in this.state.payees)) {
				this.setState({ payeeIDError: "PayeeID doesn't exist!" });
			} else {
				this.setState({ payeeIDError: '', payeeID: payeeID });
			}
		}
	}

	// Handle Express Category Change
	handleExpensesCatChange = (e) => {
		let expensesCat = e.target.value;
		this.checkExpensesCat(expensesCat);
	};

	checkExpensesCat(expensesCat){
		if (expensesCat.length == 0) {
			this.setState({ expensesCatError: 'Please fill in Expenses Category!' });
		} else {
			this.setState({ expensesCatError: '', expensesCat: expensesCat });
		}
	}
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
		let amount = parseFloat(e.target.value);
		this.checkAmount(amount);
	};

	checkAmount(amount){
		if (amount < 0) {
			this.setState({ amountError: 'Please set amount more than 0.' });
		} else if (amount > this.state.balanceAmount) {
			this.setState({
				amountError: 'You cannot transfer this amount as it exceeds your linked account balances!',
			});
		} else {
			this.setState({ amountError: '', amount: amount });
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		

		

		if (
			this.state.payeeIDError.length > 0 ||
			this.state.amountError.length > 0 ||
			this.state.expensesCatError.length > 0
		) {

			this.setState({error: "Please rectify the errors before submiting the transaction!"});
		} else {
			this.setState({error: ""});
			var data = JSON.stringify({
				custID: this.state.custID,
				payeeID: this.state.payeeID,
				dateTime: this.state.dateTime,
				amount: this.state.amount,
				eGift: this.state.eGift,
				message: this.state.message,
				expensesCat: this.expensesCat,
			});

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

					if (response.status === '200' || response.status === 200) {
						this.checkAmountBalance();
					} else {
						this.setState({error: "There is an error in submitting your transaction! Please check with the bank!"});
					}
				});
		}
	}
	handleDateTimePicker = (moment, name) => {
		let date = moment.toDate();
		this.setState({dateTime:date});
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

						{this.state.payeeIDError ? <div className="error">{this.state.payeeIDError}</div> : null}
					</Form.Group>
					<Form.Group>
							<Form.Label>Date</Form.Label>
							<Datetime
								onChange={(moment) => this.handleDateTimePicker(moment, 'date')}
								value={this.state.dateTime}
							/>
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
