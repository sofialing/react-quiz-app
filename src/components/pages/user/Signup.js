import React from 'react'
import { auth } from '../../../modules/firebase'

class SignUp extends React.Component {
	state = {
		userName: '',
		password: '',
		error: false,
		errorMessage: ''
	}

	// Handle change in input fields and save to state
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	// Handle sign up
	handleSignUp = e => {
		e.preventDefault()
		auth.createUserWithEmailAndPassword(this.state.userName, this.state.password)
			.then(data => {
				this.setState({
					error: false,
					errorMessage: ''
				})
				return this.props.history.push('/')
			})
			.catch(error => {
				this.setState({
					error: true,
					errorMessage: error.message
				})
			})
		this.setState({
			userName: '',
			password: ''
		})
	}

	render() {
		return (
			<div>
				<h1 className=' mb-5 text-center'>Sign up here</h1>
				<form onSubmit={e => this.handleSignUp(e)}>
					<div className='form-group'>
						<label htmlFor='exampleInputEmail1'>Email</label>
						<input
							type='email'
							className='form-control'
							id='exampleInputEmail1'
							placeholder='Write your email here'
							aria-describedby='emailHelp'
							name='userName'
							onChange={e => this.handleChange(e)}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='exampleInputPassword1'>Password</label>
						<input
							type='password'
							className='form-control'
							id='exampleInputPassword1'
							placeholder='Write your password here'
							name='password'
							onChange={e => this.handleChange(e)}
						/>
					</div>
					<button type='submit' className='btn btn-primary'>
						Sign up
					</button>
				</form>
				{this.state.error ? (
					<div className='alert alert-warning mt-3' role='alert'>
						{this.state.errorMessage}
					</div>
				) : (
					''
				)}
			</div>
		)
	}
}

export default SignUp
