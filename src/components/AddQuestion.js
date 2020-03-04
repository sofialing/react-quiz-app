import React from "react";
import { db } from "../modules/firebase";
import firebase from "firebase/app";

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

  handleAddQu = e => {
    e.preventDefault();
    let questionForm = {};

    console.log(questionForm);
    console.log(this.state.wrongAnswerArr);

    db.collection("quizzes")
      .doc("eBhOLLIzCGn2J6cDpOCe")
      .update({
        quiz: firebase.firestore.FieldValue.arrayUnion({
          correct: [...this.state.correctAnswerArr],
          question: this.state.question,
          wrong: [...this.state.wrongAnswerArr]
        })
      });
  };

  handleIncorrectAnswer = () => {
    this.setState({
      wrongAnswerArr: [...this.state.wrongAnswerArr, this.state.wrongAnswer]
    });
  };

  handleCorrectAnswer = () => {
    console.log(this.state.correctAnswerArr);
    this.setState({
      correctAnswerArr: [
        ...this.state.correctAnswerArr,
        { answer: this.state.correctAnswer, point: this.state.point }
      ]
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
            />
          </div>
          <div className="form-group">
            <label>The correct answer</label>
            <input
              type="text"
              className="form-control"
              placeholder="Write the correct answer"
              name="correctAnswer"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label>The correct answer point</label>
            <input
              type="text"
              className="form-control"
              placeholder="write a point"
              name="point"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label>The Wrong answer</label>
            <input
              type="text"
              className="form-control"
              placeholder="The Wrong answer"
              name="wrongAnswer"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <button onClick={e => this.handleAddQu(e)}>ADD</button>
        </form>
        <button onClick={this.handleIncorrectAnswer}>
          Add more incorrect Answer
        </button>
        <button onClick={this.handleCorrectAnswer}>
          Add more correct Answer
        </button>
      </div>
    );
  }
}

export default AddQuestion;
