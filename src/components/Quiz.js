import React, { Component } from "react";
import QuizQuestion from "./QuizQuestion";
import { db } from "../modules/firebase";

class Quiz extends Component {
  state = {
    quiz: null
  };

  getQuiz = () => {
    db.collection("quizzes")
      .doc(this.props.match.params.id)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({
            quiz: { ...doc.data() }
          });
          console.log(this.getMaxScore());
        }
      })
      .catch(error => {
        console.log("Error getting document:", error);
      });
  };

  componentDidMount() {
    this.getQuiz();
  }

  getMaxScore = () => {
    //loopa igenom quiz och räkna ut totalpoäng
    const result = this.state.quiz.quiz.map(q => {
      return q.correct.map(p => {
        return parseInt(p.point);
      });
    });
    const oneResult = result.flat(1);
    const points = oneResult.reduce((a, b) => {
      return a + b;
    });
    // console.log(points);
    return points;
  };

  render() {
    const title = this.state.quiz ? this.state.quiz.name : "";
    const quiz = this.state.quiz
      ? this.state.quiz.quiz.map((q, i) => (
          <QuizQuestion
            key={i}
            question={q.question}
            correct={q.correct}
            wrong={q.wrong}
          />
        ))
      : "";

    return (
      <div className="container">
        <h1 className="text-center mb-5">{title}</h1>
        {quiz}
        <button className="btn btn-primary">Submit</button>
      </div>
    );
  }
}

export default Quiz;
