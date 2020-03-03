import React from "react";
import QuizCard from "./QuizCard";

const Start = () => {
    return (
        <div className='container'>
            <h1 className='text-center'>Quizzes</h1>
            <div className='row'>
                <QuizCard
                    quizTitle='QUIZ TITLE'
                    quizInfo='Information about the quiz'
                />
                <QuizCard
                    quizTitle='QUIZ TITLE'
                    quizInfo='Information about the quiz'
                />
                <QuizCard
                    quizTitle='QUIZ TITLE'
                    quizInfo='Information about the quiz'
                />
            </div>
        </div>
    );
};

export default Start;
