import React from "react";
import { db } from "../modules/firebase";
import firebase from "firebase/app";
import { Link } from "react-router-dom";

class AddQuestion extends React.Component {
    state = {
        question: "",
        correctAnswer: "",
        point: "",
        wrongAnswer: "",
        wrongAnswerArr: [],
        correctAnswerArr: [],
        error: false,
        errorMessage: ""
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleAddQu = (e, id) => {
        e.preventDefault();
        if (this.state.question.length < 6) {
            this.setState({
                error: true,
                errorMessage: "your question should be more than 5 Characters"
            });
            return;
        }
        if (this.state.point.length < 1) {
            this.setState({
                error: true,
                errorMessage: "Don't forget to set a point for the question"
            });
            return;
        }
        if (this.state.correctAnswerArr.length < 1) {
            this.setState({
                error: true,
                errorMessage: "You should add at least an correct answer"
            });
            return;
        }
        if (this.state.wrongAnswerArr.length < 1) {
            this.setState({
                error: true,
                errorMessage: "You should add at least an incorrect answer "
            });
            return;
        }

        console.log(this.state.wrongAnswerArr);

        db.collection("quizzes")
            .doc(id)
            .update({
                quiz: firebase.firestore.FieldValue.arrayUnion({
                    correct: [...this.state.correctAnswerArr],
                    question: this.state.question,
                    point: this.state.point,
                    wrong: [...this.state.wrongAnswerArr]
                })
            });
        this.setState({
            question: "",
            correctAnswer: "",
            point: "",
            wrongAnswer: "",
            wrongAnswerArr: [],
            correctAnswerArr: [],
            error: false,
            errorMessage: ""
        });
    };

    handleIncorrectAnswer = () => {
        if (this.state.wrongAnswer.length < 4) {
            this.setState({
                error: true,
                errorMessage:
                    "Incorrect answer should be more than 3 Characters"
            });
            return;
        }
        this.setState({
            wrongAnswerArr: [
                ...this.state.wrongAnswerArr,
                this.state.wrongAnswer
            ],
            wrongAnswer: ""
        });
    };

    handleCorrectAnswer = () => {
        console.log(this.state.correctAnswerArr);
        if (this.state.correctAnswer.length < 4) {
            this.setState({
                error: true,
                errorMessage: "Correct answer should be more than 3 Characters"
            });
            return;
        }

        this.setState({
            correctAnswerArr: [
                ...this.state.correctAnswerArr,
                this.state.correctAnswer
            ],
            correctAnswer: ""
        });
    };

    handleCorrectDelete = i => {
        let newCorrectAnswer = this.state.correctAnswerArr.filter(
            (c, index) => {
                return i !== index;
            }
        );
        this.setState({
            correctAnswerArr: newCorrectAnswer
        });
    };

    handleWrongDelete = i => {
        let newWrongAnswer = this.state.wrongAnswerArr.filter((c, index) => {
            return i !== index;
        });
        this.setState({
            wrongAnswerArr: newWrongAnswer
        });
    };

    render() {
        return (
            <div>
                <h2>{this.state.errorMessage}</h2>
                <form>
                    <div className="form-group">
                        <label>Write a question</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Write a question"
                            name="question"
                            onChange={e => this.handleChange(e)}
                            value={this.state.question}
                        />
                    </div>
                    <div className="form-group">
                        <label>Write a point</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="write a point"
                            name="point"
                            onChange={e => this.handleChange(e)}
                            value={this.state.point}
                        />
                    </div>
                    <ul>
                        {this.state.correctAnswerArr.map((answer, i) => {
                            return (
                                <li key={i} className="flex-list">
                                    <span>The answer: {answer}</span>
                                    <span
                                        className="delete-span"
                                        onClick={() =>
                                            this.handleCorrectDelete(i)
                                        }
                                    >
                                        X
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="input-group mb-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Write the correct answer"
                            name="correctAnswer"
                            onChange={e => this.handleChange(e)}
                            value={this.state.correctAnswer}
                        />
                        <div className="input-group-prepend">
                            <span
                                className="input-group-text span-button"
                                onClick={this.handleCorrectAnswer}
                            >
                                Add more correct Answer
                            </span>
                        </div>
                    </div>
                    <ul>
                        {this.state.wrongAnswerArr.map((answer, i) => {
                            return (
                                <li key={i} className="flex-list">
                                    <span>The answer: {answer}</span>
                                    <span
                                        className="delete-span"
                                        onClick={() =>
                                            this.handleWrongDelete(i)
                                        }
                                    >
                                        x
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="The Wrong answer"
                            name="wrongAnswer"
                            onChange={e => this.handleChange(e)}
                            value={this.state.wrongAnswer}
                        />
                        <div className="input-group-prepend ">
                            <span
                                className="input-group-text span-button"
                                onClick={this.handleIncorrectAnswer}
                            >
                                Add more incorrect Answer
                            </span>
                        </div>
                    </div>
                    <button
                        type="submit"
                        onClick={e => this.handleAddQu(e, this.props.id)}
                    >
                        ADD
                    </button>
                </form>
                <Link to="">go to the quiz</Link>
            </div>
        );
    }
}

export default AddQuestion;
