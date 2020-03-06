import React from 'react';

const Result = props => {
	const resultMsg =
		props.result.score === props.result.maxScore ? (
			<h2 className='text-center py-5'>
				Congratulations your result on the quiz:{' '}
				<span className='input-result'>{props.result.name}</span> was{' '}
				<span className='input-result'>{props.result.score}</span> out
				of <span className='input-result'>{props.result.maxScore}</span>{' '}
				🥳
			</h2>
		) : (
			<h2 className='text-center py-5'>
				You have now completed the quiz:{' '}
				<span className='input-result'>{props.result.name}</span>. You
				got: <span className='input-result'>{props.result.score}</span>{' '}
				out of{' '}
				<span className='input-result'>{props.result.maxScore}</span>{' '}
				points.
			</h2>
		);
	return <div className='container'>{resultMsg}</div>;
};

export default Result;
