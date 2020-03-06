import React from 'react';
import { auth } from '../modules/firebase';

class Login extends React.Component {
	state = {
		email: '',
		password: '',
		errorMsg: false
	};

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();

		const { email, password } = this.state;

		auth.signInWithEmailAndPassword(email, password)
			.then(() => {
				this.props.history.push('/addQuiz');
			})
			.catch(err => {
				this.setState({
					errorMsg: true
				});
			});
	};

	render() {
		return (
			<div id='login'>
				<h1 className='mb-5'>Login</h1>
				<form id='login-form' onSubmit={this.handleSubmit}>
					<div className='form-group'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							className='form-control'
							onChange={this.handleChange}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							className='form-control'
							onChange={this.handleChange}
						/>
					</div>

					<div className='d-flex justify-content-end'>
						<button type='submit' className='btn btn-success'>
							Log in
						</button>
					</div>
					{this.state.errorMsg ? (
						<div className='alert alert-warning mt-3' role='alert'>
							Incorrect email or password. Please try again.
						</div>
					) : (
						''
					)}
				</form>
			</div>
		);
	}
}

export default Login;
