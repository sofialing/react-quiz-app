import React from 'react';

const Result = props => {
	const resultMsg =
		props.result.score === props.result.maxScore ? (
			<h1 className='text-center'>
				Congratulations your result on the quiz {props.result.name} was{' '}
				{props.result.score}/{props.result.maxScore} 🥳
			</h1>
		) : (
			<h1 className='text-center'>
				Your result on the quiz {props.result.name} was{' '}
				{props.result.score}/{props.result.maxScore}
			</h1>
		);
	return (
		<div className='container'>
			{resultMsg}
			{/* <h1 className='text-center'>
				Your result on the quiz {props.result.name} was{' '}
				{props.result.score}/{props.result.maxScore}
			</h1> */}
		</div>
	);
};

export default Result;
