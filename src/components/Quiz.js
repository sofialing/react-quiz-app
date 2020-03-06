import React, { Component } from 'react'
import QuizQuestion from './QuizQuestion'
import Result from './Result'
import { db } from '../modules/firebase'
import { Link } from 'react-router-dom'

class Quiz extends Component {
	state = {
		current: 0,
		name: '',
		quiz: null,
		quizOver: false,
		score: 0
	}

	componentDidMount() {
		this.getQuiz()
	}

	getQuiz = () => {
		db.collection('quizzes')
			.doc(this.props.match.params.id)
			.get()
			.then(doc => {
				if (doc.exists) {
					this.setState({
						name: doc.data().name,
						quiz: [...doc.data().quiz]
					})
				}
			})
			.catch(error => {
				console.log('Error getting document:', error)
			})
	}

	getMaxScore = () => {
		const maxScore = this.state.quiz
			.map(question => Number(question.point))
			.reduce((total, point) => total + point)

		return maxScore
	}

	isLastQuestion = () => {
		return this.state.current === this.state.quiz.length - 1
	}

	showNextQuestion = () => {
		if (this.state.current < this.state.quiz.length - 1) {
			this.setState(prevState => ({
				current: prevState.current + 1
			}))
		} else {
			this.setState({ quizOver: true })
		}
	}

	UpdateScore = point => {
		this.setState(prevState => ({
			score: prevState.score + point
		}))
		this.showNextQuestion()
	}

	render() {
		if (this.state.quizOver) {
			return (
				<Result
					result={{
						name: this.state.name,
						score: this.state.score,
						maxScore: this.getMaxScore()
					}}
				/>
			)
		}

		return this.state.quiz ? (
			<div>
				<h1 className='text-center mb-5'>{this.state.name}</h1>
				<QuizQuestion
					quiz={this.state.quiz[this.state.current]}
					onUpdateScore={this.UpdateScore}
					isLastQuestion={this.isLastQuestion()}
				/>
				<Link to='/' className='btn btn-primary'>
					Back to all quizzes
				</Link>
			</div>
		) : (
			''
		)
	}
}

export default Quiz
