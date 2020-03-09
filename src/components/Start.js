import React from "react";
import QuizCard from "./QuizCard";
import { db } from "../modules/firebase";
// import SignUp from "./signup";

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
                    if (!doc.data().quiz) {
                        return;
                    }
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
    deleteQuiz = id => {
        console.log("hi");
        db.collection("quizzes")
            .doc(id)
            .delete()
            .then(() => {
                this.gitData();
            })
            .catch(error => {
                console.error("Error removing document: ", error);
            });
    };

    render() {
        const quizzez = this.state.quiz
            ? this.state.quiz.map((quiz, i) => {
                  return (
                      <QuizCard
                          quiz={quiz}
                          key={i}
                          deleteQuiz={this.deleteQuiz}
                          user={this.props.user}
                      />
                  );
              })
            : "";

        return (
            <div>
                <h1 className="text-center mb-5">Quizzes</h1>
                <p className="text-center">
                    Sign up if you want to add a new quiz!
                </p>
                <div className="card-deck">{quizzez}</div>
            </div>
        );
    }
}

export default Start;
