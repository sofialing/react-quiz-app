import React, { Component } from "react";
import QuizQuestion from "../quiz/QuizQuestion";
import Result from "./Result";
import { db } from "../../modules/firebase";
import { Link } from "react-router-dom";

class Quiz extends Component {
    state = {
        current: 0,
        name: "",
        quiz: null,
        quizOver: false,
        score: 0
    };

    componentDidMount() {
        this.getQuiz();
    }

    // Get selected quiz from Firebase
    getQuiz = () => {
        db.collection("quizzes")
            .doc(this.props.match.params.id)
            .get()
            .then(doc => {
                if (doc.exists) {
                    this.setState({
                        name: doc.data().name,
                        quiz: [...doc.data().quiz]
                    });
                } else {
                    this.props.history.push("/");
                }
            })
            .catch(error => {
                console.error("Error getting document:", error);
            });
    };

    // Calculate the max score of the quiz
    getMaxScore = () => {
        const maxScore = this.state.quiz
            .map(question => Number(question.point))
            .reduce((total, point) => total + point);

        return maxScore;
    };

    // Check if current question is the last one
    isLastQuestion = () => {
        return this.state.current === this.state.quiz.length - 1;
    };

    // Update current number and show next question
    showNextQuestion = () => {
        if (this.state.current < this.state.quiz.length - 1) {
            this.setState(prevState => ({
                current: prevState.current + 1
            }));
        } else {
            this.setState({ quizOver: true });
        }
    };

    // Update quiz score
    updateScore = point => {
        this.setState(prevState => ({
            score: prevState.score + point
        }));
        this.showNextQuestion();
    };

    correctAnswers = () => {
        const correct = this.state.quiz.map((q, i) => {
            return { question: q.question, correct: [...q.correct] };
        });

        const answersList = correct.map((c, i) => {
            return (
                <div key={i} className="mt-4">
                    <p>{c.question}</p>
                    <ul className="list-group">
                        {c.correct.map((corr, i) => {
                            return (
                                <li key={i} className="list-group-item">
                                    {corr}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        });
        return answersList;
    };

    render() {
        // Check if quiz is over and render result view
        if (this.state.quizOver) {
            return (
                <Result
                    result={{
                        name: this.state.name,
                        score: this.state.score,
                        maxScore: this.getMaxScore()
                    }}
                    correctAnswers={this.correctAnswers}
                />
            );
        }

        return this.state.quiz ? (
            <div>
                <h1 className="text-center mb-5">
                    {this.state.name.charAt(0).toUpperCase() +
                        this.state.name.slice(1)}
                </h1>
                <QuizQuestion
                    quiz={this.state.quiz[this.state.current]}
                    onUpdateScore={this.updateScore}
                    isLastQuestion={this.isLastQuestion()}
                    number={this.state.current + 1}
                />
                <Link to="/" className="btn btn-primary">
                    Back to all quizzes
                </Link>
            </div>
        ) : (
            ""
        );
    }
}

export default Quiz;
