import React from 'react'
import { db } from '../modules/firebase'
import firebase from 'firebase/app'
import { Link } from 'react-router-dom'

class AddQuestion extends React.Component {
	state = {
		question: '',
		correctAnswer: '',
		point: '',
		wrongAnswer: '',
		wrongAnswerArr: [],
		correctAnswerArr: [],
		error: false,
		errorMessage: '',
		questionAdded: false
	}

	// Handle change in input fields and save to state
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	// Add question to the quiz in firebase
	handleAddQu = (e, id) => {
		e.preventDefault()

		// Check if question is at least 5 characters and ends with '?'
		if (this.state.question.length < 6 || this.state.question.slice(-1) !== '?') {
			this.setState({
				error: true,
				errorMessage:
					"Your question should be more than 5 characters and end with '?' "
			})
			return
		}

		// Check if a point has been added
		if (this.state.point < 1) {
			this.setState({
				error: true,
				errorMessage: "Don't forget to set a point for the question"
			})
			return
		}

		// Check if at least one correct answer have been added
		if (this.state.correctAnswerArr.length < 1) {
			this.setState({
				error: true,
				errorMessage: 'You should add at least one correct answer'
			})
			return
		}

		// Check if at least one incorrect answer have been added
		if (this.state.wrongAnswerArr.length < 1) {
			this.setState({
				error: true,
				errorMessage: 'You should add at least one incorrect answer '
			})
			return
		}

		// Add to Firebase
		db.collection('quizzes')
			.doc(id)
			.update({
				quiz: firebase.firestore.FieldValue.arrayUnion({
					correct: [...this.state.correctAnswerArr],
					question: this.state.question,
					point: this.state.point,
					wrong: [...this.state.wrongAnswerArr]
				})
			})

		// Reset state
		this.setState({
			question: '',
			correctAnswer: '',
			point: '',
			wrongAnswer: '',
			wrongAnswerArr: [],
			correctAnswerArr: [],
			error: false,
			errorMessage: '',
			questionAdded: true
		})
	}

	// Handle incorrect answers and save to state
	handleIncorrectAnswer = e => {
		e.preventDefault()

		if (this.state.wrongAnswer.length < 1) {
			this.setState({
				error: true,
				errorMessage: "Incorrect answer shouldn't be empty"
			})
			return
		}

		this.setState({
			wrongAnswerArr: [...this.state.wrongAnswerArr, this.state.wrongAnswer],
			wrongAnswer: ''
		})
	}

	// Handle correct answers and save to state
	handleCorrectAnswer = e => {
		e.preventDefault()

		if (this.state.correctAnswer.length < 1) {
			this.setState({
				error: true,
				errorMessage: "Correct answer shouldn't be empty"
			})
			return
		}

		this.setState({
			correctAnswerArr: [...this.state.correctAnswerArr, this.state.correctAnswer],
			correctAnswer: ''
		})
	}

	// Delete a correct answer from state
	handleCorrectDelete = i => {
		let newCorrectAnswer = this.state.correctAnswerArr.filter((c, index) => {
			return i !== index
		})
		this.setState({
			correctAnswerArr: newCorrectAnswer
		})
	}

	// Delete a incorrect answer from state
	handleWrongDelete = i => {
		let newWrongAnswer = this.state.wrongAnswerArr.filter((c, index) => {
			return i !== index
		})
		this.setState({
			wrongAnswerArr: newWrongAnswer
		})
	}

	render() {
		return (
			<div>
				<h1 className='text-center'>Add a question</h1>
				{this.state.error ? (
					<div className='alert alert-warning mt-3' role='alert'>
						{this.state.errorMessage}
					</div>
				) : (
					''
				)}
				<form>
					<div className='form-group'>
						<label>Write a question</label>
						<input
							type='text'
							className='form-control'
							placeholder='Question'
							name='question'
							onChange={e => this.handleChange(e)}
							value={this.state.question}
						/>
					</div>
					<div className='form-group'>
						<label>Write a point</label>
						<input
							type='number'
							className='form-control'
							placeholder='Point'
							name='point'
							onChange={e => this.handleChange(e)}
							value={this.state.point}
						/>
					</div>
					<ul className='list-group'>
						{this.state.correctAnswerArr.map((answer, i) => {
							return (
								<li key={i} className='list-group-item flex-list'>
									<span>
										Correct answer {i + 1}: {answer}
									</span>
									<button
										type='button'
										className='btn btn-sm btn-danger'
										onClick={() => this.handleCorrectDelete(i)}>
										<i className='far fa-trash-alt'></i>
									</button>
								</li>
							)
						})}
					</ul>
					<div className='input-group my-2'>
						<input
							type='text'
							className='form-control'
							placeholder='Correct answer'
							name='correctAnswer'
							onChange={e => this.handleChange(e)}
							value={this.state.correctAnswer}
						/>
						<div className='input-group-append'>
							<button
								className='btn btn-primary btn-add'
								onClick={this.handleCorrectAnswer}>
								Add correct answer
							</button>
						</div>
					</div>
					<ul className='list-group'>
						{this.state.wrongAnswerArr.map((answer, i) => {
							return (
								<li key={i} className='list-group-item flex-list'>
									<span>
										Incorrect answer {i + 1}: {answer}
									</span>
									<button
										type='button'
										className='btn btn-sm btn-danger'
										onClick={() => this.handleWrongDelete(i)}>
										<i className='far fa-trash-alt'></i>
									</button>
								</li>
							)
						})}
					</ul>
					<div className='input-group my-2'>
						<input
							type='text'
							className='form-control'
							placeholder='Incorrect answer'
							name='wrongAnswer'
							onChange={e => this.handleChange(e)}
							value={this.state.wrongAnswer}
						/>
						<div className='input-group-append'>
							<button
								className='btn btn-primary btn-add'
								onClick={this.handleIncorrectAnswer}>
								Add incorrect answer
							</button>
						</div>
					</div>
					<button
						type='submit'
						onClick={e => this.handleAddQu(e, this.props.id)}
						className='btn btn-primary my-3'>
						Add question
					</button>
				</form>

				{this.state.questionAdded ? (
					<Link to={'/quiz/' + this.props.id}>Go to the quiz</Link>
				) : (
					''
				)}
			</div>
		)
	}
}

export default AddQuestion
