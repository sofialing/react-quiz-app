import React from "react";
import { db } from "../modules/firebase";
import firebase from "firebase/app";

class AddQuestion extends React.Component {
  state = {
    question: "",
    correctAnswer: "",
    point: "",
    wrongAnswer: ""
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

    db.collection("quizzes")
      .doc("eBhOLLIzCGn2J6cDpOCe")
      .update({
        quiz: firebase.firestore.FieldValue.arrayUnion({
          correct: [
            { answer: this.state.correctAnswer, point: this.state.point }
          ],
          question: this.state.question,
          wrong: [this.state.wrongAnswer]
        })
      });
  };

  render() {
    return (
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
    );
  }
}

export default AddQuestion;
