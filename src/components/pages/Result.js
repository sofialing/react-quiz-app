import React from 'react';
import { Link } from 'react-router-dom';

const Result = props => {
	const resultMsg =
		props.result.score === props.result.maxScore ? (
			<div
				className='alert alert-light pt-5 pb-3 text-center'
				role='alert'
			>
				<h2 className='alert-heading'>
					Congratulations{' '}
					<span role='img' aria-label='jsx-a11y/accessible-emoji'>
						🥳
					</span>
				</h2>
				<h3>
					Your result on the quiz:{' '}
					<span className='input-result'>{props.result.name}</span>{' '}
					was{' '}
					<span className='input-result'>{props.result.score}</span>{' '}
					out of{' '}
					<span className='input-result'>
						{props.result.maxScore}
					</span>
				</h3>
				<Link to='/' className='btn btn-primary mt-3'>
					Back to Quizzes
				</Link>
			</div>
		) : (
			<div
				className='alert alert-light pt-5 pb-3 text-center'
				role='alert'
			>
				<h2 className='alert-heading'>Good job!</h2>
				<h3>
					Your result on the quiz:{' '}
					<span className='input-result'>{props.result.name}</span>{' '}
					was{' '}
					<span className='input-result'>{props.result.score}</span>{' '}
					out of{' '}
					<span className='input-result'>
						{props.result.maxScore}
					</span>
				</h3>
				<Link to='/' className='btn btn-primary mt-3'>
					Back to Quizzes
				</Link>
			</div>
		);
	return (
		<React.Fragment>
			<div className='d-flex justify-content-center align-items-center flex-column'>
				{resultMsg}
			</div>
			{props.correctAnswers()}
		</React.Fragment>
	);
};

export default Result;
