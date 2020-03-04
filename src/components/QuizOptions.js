import React from 'react'

const QuizOptions = props => {
	const wrong = props.options.map((option, i) => {
		return (
			<div className='custom-control custom-checkbox' key={i}>
				<input type='checkbox' className='custom-control-input' id={i} />
				<label className='custom-control-label' htmlFor={i}>
					{option}
				</label>
			</div>
		)
	})
	const correct = props.correct.map((option, i) => {
		return (
			<div className='custom-control custom-checkbox' key={i + 10}>
				<input type='checkbox' className='custom-control-input' id={i} />
				<label className='custom-control-label' htmlFor={i}>
					{option.answer}
				</label>
			</div>
		)
	})
	const answers = [...wrong, ...correct]

	return answers
}

export default QuizOptions
