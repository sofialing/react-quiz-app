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
        correctAnswerArr: []
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleAddQu = (e, id) => {
        e.preventDefault();
        if (this.state.question.length < 6) return;
        console.log(this.state.wrongAnswerArr);

        db.collection("quizzes")
            .doc(id)
            .update({
                quiz: firebase.firestore.FieldValue.arrayUnion({
                    correct: [...this.state.correctAnswerArr],
                    question: this.state.question,
                    wrong: [...this.state.wrongAnswerArr]
                })
            });
        this.setState({
            question: "",
            correctAnswer: "",
            point: "",
            wrongAnswer: "",
            wrongAnswerArr: [],
            correctAnswerArr: []
        });
    };

    handleIncorrectAnswer = () => {
        if (this.state.wrongAnswer.length < 3) return;
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
        if (
            this.state.correctAnswer.length < 3 ||
            this.state.point.length === 0
        )
            return;
        this.setState({
            correctAnswerArr: [
                ...this.state.correctAnswerArr,
                { answer: this.state.correctAnswer, point: this.state.point }
            ],
            correctAnswer: "",
            point: ""
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
                    <ul>
                        {this.state.correctAnswerArr.map((answer, i) => {
                            return (
                                <li key={i} className="flex-list">
                                    <span>The answer: {answer.answer}</span>
                                    <span>Points: {answer.point}</span>
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
                        <input
                            type="number"
                            className="form-control"
                            placeholder="write a point"
                            name="point"
                            onChange={e => this.handleChange(e)}
                            value={this.state.point}
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
