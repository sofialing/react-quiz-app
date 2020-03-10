import React from 'react'
import { Link } from 'react-router-dom'
import quizImage from '../../images/quiz.jpg'

const QuizCard = props => {
	const { name, description, id, quiz, image, createdBy } = props.quiz

	return (
		<article className='col-12 col-md-4  mb-4'>
			<div className='card h-100 text-center'>
				<img
					src={image ? image : quizImage}
					className='card-img-top'
					alt={description}
				/>

				<div className='card-body'>
					<h5 className='card-title'>
						{name.charAt(0).toUpperCase() + name.slice(1)}
					</h5>
					<h6 className='card-subtitle mb-2 text-muted'>
						{quiz.length} questions
					</h6>
					<p className='card-text'>
						{description.charAt(0).toUpperCase() + description.slice(1)}
					</p>
				</div>
				<div className='card-footer text-muted'>
					<Link to={'/quiz/' + id} className='btn btn-info mx-2'>
						Start Quiz
					</Link>
					{props.user ? (
						props.user.email === createdBy ? (
							<button
								className='btn btn-danger mx-2'
								onClick={() => props.deleteQuiz(id)}>
								Delete Quiz
							</button>
						) : (
							''
						)
					) : (
						''
					)}
				</div>
			</div>
		</article>
	)
}

export default QuizCard
