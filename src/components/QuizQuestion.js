import React from 'react'
import QuizOptions from './QuizOptions'

const QuizQuestion = props => {
	const { question } = props
	const options = ['Fay Wray', 'Jean Harlow', 'Vivien Leigh', 'Mae West']
	return (
		<div className='card mb-4'>
			<div className='card-body'>
				<h5 className='card-title'>{question}</h5>
				<QuizOptions options={options} />
			</div>
		</div>
	)
}

export default QuizQuestion
