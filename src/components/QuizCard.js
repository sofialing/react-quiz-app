import React from "react";
import { Link } from "react-router-dom";
import quizImage from "../images/quiz.jpg";

const QuizCard = props => {
    const { name, description, id, quiz, image } = props.quiz;

    return (
        <div className="card text-center mb-4">
            <img
                src={image ? image : quizImage}
                class="card-img-top"
                alt={description}
            />

            <div className="card-body">
                <h5 className="card-title">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                </h5>
                <h6 class="card-subtitle mb-2 text-muted">
                    {quiz.length} questions
                </h6>
                <p className="card-text">
                    {description.charAt(0).toUpperCase() + description.slice(1)}
                </p>
            </div>
            <div class="card-footer text-muted">
                <Link to={"/quiz/" + id} className="btn btn-info">
                    Go to Quiz
                </Link>
            </div>
        </div>
    );
};

export default QuizCard;
