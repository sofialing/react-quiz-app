import React from 'react'

const QuizOptions = props => {
	return props.options.map((option, i) => (
		<div className='custom-control custom-checkbox' key={i}>
			<input type='checkbox' className='custom-control-input' id={i} />
			<label className='custom-control-label' htmlFor={i}>
				{option}
			</label>
		</div>
	))
}

export default QuizOptions
