import React from 'react'
import AddQuestion from '../createQuiz/AddQuestion'
import CreateQuiz from '../createQuiz/CreateQuiz'

class AddNewQuiz extends React.Component {
	state = {
		quizCreated: false,
		id: ''
	}

	quizCreated = id => {
		this.setState({
			quizCreated: true,
			id: id
		})
	}

	render() {
		// Check if a user is logged in, if not redirect to login page
		if (!this.props.user) {
			this.props.history.push('/login')
		}

		return this.state.quizCreated ? (
			<AddQuestion id={this.state.id} />
		) : (
			<CreateQuiz onQuizCreated={this.quizCreated} user={this.props.user} />
		)
	}
}

export default AddNewQuiz
