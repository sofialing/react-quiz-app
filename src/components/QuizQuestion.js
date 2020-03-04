import React from "react";
import QuizOptions from "./QuizOptions";

const QuizQuestion = props => {
  const { question } = props;
  const options = props.wrong;
  console.log(props);
  const correct = props.correct.map(c => {
    console.log(c.answer);
    return c;
  });
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{question}</h5>
        <QuizOptions options={options} correct={correct} />
        {/* <QuizOptions options={options} /> */}
      </div>
    </div>
  );
};

export default QuizQuestion;
