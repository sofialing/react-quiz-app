import React from 'react'
import QuizOptions from './QuizOptions'

const QuizQuestion = props => {
	const { question, correct, wrong } = props.quiz
	const options = correct.map(option => option.answer).concat(wrong)

	return (
		<div className='card mb-4'>
			<div className='card-body'>
				<h5 className='card-title'>{question}</h5>
				<QuizOptions
					options={options}
					correct={correct}
					onUpdateScore={props.onUpdateScore}
				/>
			</div>
		</div>
	)
}

export default QuizQuestion
