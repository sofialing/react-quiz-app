import React, { Component } from "react";
import QuizQuestion from "./QuizQuestion";
import { db } from "../modules/firebase";

class Quiz extends Component {
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
    console.log(this.state.quiz);
    const quiz = this.state.quiz
      ? this.state.quiz.map(data => {
          console.log("quiz data", data.quiz);
          return data.quiz.map(q => {
            return (
              <QuizQuestion
                key={data.id}
                question={q.question}
                correct={q.correct}
                wrong={q.wrong}
              />
            );
          });
        })
      : "";

    return (
      <div>
        <h1>Quiz</h1>
        {quiz}
      </div>
    );
  }
}

export default Quiz;
