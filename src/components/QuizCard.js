import React from "react";
import { Link } from "react-router-dom";

const QuizCard = props => {
    const { name, description, id, quiz } = props.quiz;

    return (
        <div className="col-sm-12 col-md-4">
            <div className="card text-center mb-2">
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                        {quiz.length} questions
                    </h6>
                    <p className="card-text">{description}</p>
                    <Link to={"/quiz/" + id} className="btn btn-info">
                        Go to Quiz
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default QuizCard;
