import React from "react";
import QuizCard from "./QuizCard";
import { db } from "../modules/firebase";

class Start extends React.Component {
    state = {
        quiz: null
    };

    gitData = () => {
        db.collection("quizzes")
            .get()
            .then(response => {
                const quiz = [];
                response.forEach(doc => {
                    quiz.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                this.setState({
                    quiz
                });
            });
    };
    componentDidMount() {
        this.gitData();
    }

    render() {
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
    }
}

export default Start;
