import React from 'react'
import { db } from '../../modules/firebase'

class createQuiz extends React.Component {
	state = {
		name: '',
		disc: '',
		id: '',
		imgSrc: '',
		error: false,
		errorMessage: ''
	}

	// Add new quiz to firebase
	AddNewQuiz = e => {
		e.preventDefault()

		if (this.state.name.length < 4) {
			this.setState({
				error: true,
				errorMessage: 'Enter a name before adding a new quiz.'
			})
			return
		}

		if (this.state.disc.length < 4) {
			this.setState({
				error: true,
				errorMessage: 'Enter a description before adding a new quiz.'
			})
			return
		}

		db.collection('quizzes')
			.add({
				name: this.state.name,
				description: this.state.disc,
				image: this.state.imgSrc,
				createdBy: this.props.user.email
			})
			.then(data => this.props.onQuizCreated(data.id))
			.catch(error => console.error(error))
	}

	// Handle change in input fields and save to state
	handleOnChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		return (
			<div>
				<h1 className='text-center'>Add a new quiz</h1>
				{this.state.error ? (
					<div className='alert alert-warning mt-3' role='alert'>
						{this.state.errorMessage}
					</div>
				) : (
					''
				)}
				<form onSubmit={e => this.AddNewQuiz(e)}>
					<div className='form-group'>
						<label>Add a name</label>
						<input
							type='text'
							className='form-control'
							placeholder='Name'
							name='name'
							onChange={e => this.handleOnChange(e)}
							value={this.state.name}
						/>
					</div>
					<div className='form-group'>
						<label>Add a description</label>
						<input
							type='text'
							className='form-control'
							name='disc'
							placeholder='Description'
							onChange={e => this.handleOnChange(e)}
							value={this.state.disc}
						/>
					</div>
					<div className='form-group'>
						<label>Add an image url</label>
						<input
							type='text'
							className='form-control'
							name='imgSrc'
							placeholder='Image url'
							onChange={e => this.handleOnChange(e)}
							value={this.state.imgSrc}
						/>
					</div>
					<button type='submit' className='btn btn-primary'>
						Create new quiz
					</button>
				</form>
			</div>
		)
	}
}

export default createQuiz
