import React from 'react'
import { auth } from '../modules/firebase'
import { Link } from 'react-router-dom'

class Login extends React.Component {
	state = {
		email: '',
		password: '',
		errorMsg: false
	}

	// Handle change in input fields and save to state
	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	// Handle login and redirect if succeeded
	handleSubmit = e => {
		e.preventDefault()

		const { email, password } = this.state

		auth.signInWithEmailAndPassword(email, password)
			.then(() => {
				this.props.history.push('/')
			})
			.catch(err => {
				this.setState({
					errorMsg: true
				})
			})
	}

	render() {
		return (
			<div id='login'>
				<h1 className='mb-5 text-center'>Login with your email</h1>
				<form id='login-form' onSubmit={this.handleSubmit}>
					<div className='form-group'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							className='form-control'
							placeholder='Write your email here'
							onChange={this.handleChange}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							className='form-control'
							placeholder='Write your password here'
							onChange={this.handleChange}
						/>
					</div>

					<div className='d-flex'>
						<button type='submit' className='btn btn-primary'>
							Log in
						</button>
					</div>
					<div className=' mt-3'>
						<Link to='/PasswordReset'>Forgot your password?</Link>
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
		)
	}
}

export default Login
