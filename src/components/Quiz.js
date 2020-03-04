import React, { Component } from 'react'
import QuizQuestion from './QuizQuestion'
import { db } from '../modules/firebase'
import { Redirect } from 'react-router-dom'

class Quiz extends Component {
	state = {
		quiz: null,
		quizOver: false,
		score: 0
	}

	getQuiz = () => {
		db.collection('quizzes')
			.doc(this.props.match.params.id)
			.get()
			.then(doc => {
				if (doc.exists) {
					this.setState({
						quiz: { ...doc.data() }
					})
				}
			})
			.catch(error => {
				console.log('Error getting document:', error)
			})
	}

	componentDidMount() {
		this.getQuiz()
	}

	submitQuiz = e => {
		e.preventDefault()
		this.setState({ quizOver: true })
	}

	render() {
		if (this.state.quizOver) {
			return (
				<Redirect
					to={{
						pathname: '/result',
						state: {
							result: {
								score: this.state.score,
								name: this.state.name
							}
						}
					}}
				/>
			)
		}

		const title = this.state.quiz ? this.state.quiz.name : ''
		const quiz = this.state.quiz
			? this.state.quiz.quiz.map((q, i) => (
					<QuizQuestion
						key={i}
						question={q.question}
						correct={q.correct}
						wrong={q.wrong}
					/>
			  ))
			: ''

		return (
			<div className='container'>
				<h1 className='text-center mb-5'>{title}</h1>
				<form onSubmit={this.submitQuiz}>
					{quiz}
					<button className='btn btn-primary'>Submit</button>
				</form>
			</div>
		)
	}
}

export default Quiz
