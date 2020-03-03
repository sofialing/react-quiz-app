import React from "react";
import { Link } from "react-router-dom";

const QuizCard = props => {
    return (
        <div className='col-sm-12 col-md-4'>
            <div className='card text-center mb-2'>
                <div className='card-body'>
                    <h5 className='card-title'>{props.quizTitle}</h5>
                    <p className='card-text'>{props.quizInfo}</p>
                    <Link to={"/.../"} className='btn btn-info'>
                        Go to Quiz
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default QuizCard;
