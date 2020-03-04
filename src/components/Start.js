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
                    // console.log(doc.data());
                    quiz.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                this.setState({
                    quiz
                });
                console.log(quiz);
            });
    };
    componentDidMount() {
        this.gitData();
    }

    render() {
        const quizzez = this.state.quiz
            ? this.state.quiz.map((quiz, i) => {
                  return <QuizCard quiz={quiz} key={i} />;
              })
            : "";

        return (
            <div className='container'>
                <h1 className='text-center'>Quizzes</h1>
                <div className='row'>{quizzez}</div>
            </div>
        );
    }
}

export default Start;
