import React, { Component } from 'react'
import QuizQuestion from './QuizQuestion'

class Quiz extends Component {
	state = {
		quiz: null
	}

	render() {
		return (
			<div>
				<h1>Quiz</h1>
				<QuizQuestion question='Who played the female lead in the 1933 film King Kong?' />
				<QuizQuestion question='Who played the female lead in the 1933 film King Kong?' />
				<QuizQuestion question='Who played the female lead in the 1933 film King Kong?' />
				<QuizQuestion question='Who played the female lead in the 1933 film King Kong?' />
			</div>
		)
	}
}

export default Quiz
