import React, { Component } from "react";

class QuizOptions extends Component {
  state = {
    userAnswer: []
  };

  handleChange = e => {
    const { name } = e.target;

    if (this.state.userAnswer.includes(name)) {
      const newArray = [...this.state.userAnswer];
      const i = newArray.indexOf(name);
      newArray.splice(i, 1);
      this.setState({ userAnswer: newArray });
    } else {
      this.setState(prevState => ({
        userAnswer: [...prevState.userAnswer, name]
      }));
    }
  };

  checkAnswer = e => {
    e.preventDefault();
    let point = 0;
    if (this.state.userAnswer[0] === this.props.correct[0].answer) {
      point = 1;
    }

    this.setState({ userAnswer: [] });
    this.props.onUpdateScore(point);
  };

  render() {
    const checkboxes = this.props.options.map((option, i) => (
      <div className="custom-control custom-checkbox" key={i}>
        <input
          type="checkbox"
          className="custom-control-input"
          id={`${option}-${i}`}
          name={option}
          onChange={this.handleChange}
          checked={this.state.userAnswer.includes(option)}
        />
        <label className="custom-control-label" htmlFor={`${option}-${i}`}>
          {option}
        </label>
      </div>
    ));

    return (
      <form onSubmit={this.checkAnswer}>
        {checkboxes}
        <button className="btn btn-primary mt-3">Next question</button>
      </form>
    );
  }
}

export default QuizOptions;
