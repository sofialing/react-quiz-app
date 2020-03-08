import React, { Component } from "react";

class QuizOptions extends Component {
    state = {
        userAnswer: []
    };

    handleCheckboxes = e => {
        const { value } = e.target;
        const { userAnswer } = this.state;
        const { correct } = this.props;

        if (userAnswer.includes(value)) {
            const newUserAnswer = [...userAnswer];
            const i = newUserAnswer.indexOf(value);
            newUserAnswer.splice(i, 1);

            this.setState({
                userAnswer: newUserAnswer
            });
        } else if (userAnswer.length === correct.length) {
            e.preventDefault();
        } else {
            this.setState(prevState => ({
                userAnswer: [...prevState.userAnswer, value]
            }));
        }
    };

    handleRadio = e => {
        this.setState({ userAnswer: e.target.value });
    };

    checkAnswer = e => {
        e.preventDefault();

        const { correct, point } = this.props;
        const { userAnswer } = this.state;

        const correctAnswers = correct.filter(answer =>
            userAnswer.includes(answer)
        );
        let totalPoint =
            (Number(point) / correct.length) * correctAnswers.length;

        this.setState({ userAnswer: [] });
        this.props.onUpdateScore(totalPoint);
    };

    getCheckboxes = () => {
        const checkboxes = this.props.options.map((option, i) => (
            <div className="custom-control custom-checkbox" key={i}>
                <input
                    type="checkbox"
                    className="custom-control-input"
                    id={option}
                    value={option}
                    onChange={this.handleCheckboxes}
                    checked={this.state.userAnswer.includes(option)}
                />
                <label className="custom-control-label" htmlFor={option}>
                    {option}
                </label>
            </div>
        ));

        return checkboxes;
    };

    getRadios = () => {
        const radios = this.props.options.map((option, i) => (
            <div className="custom-control custom-radio" key={i}>
                <input
                    type="radio"
                    className="custom-control-input"
                    id={option}
                    value={option}
                    onChange={this.handleRadio}
                    checked={this.state.userAnswer === option}
                />
                <label className="custom-control-label" htmlFor={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                </label>
            </div>
        ));

        return radios;
    };

    render() {
        const buttonText = this.props.isLastQuestion
            ? "Finish quiz"
            : "Next question";
        const buttonState = this.state.userAnswer.length ? false : true;

        return (
            <form onSubmit={this.checkAnswer}>
                {this.props.correct.length === 1
                    ? this.getRadios()
                    : this.getCheckboxes()}

                <button disabled={buttonState} className="btn btn-primary mt-3">
                    {buttonText}
                </button>
            </form>
        );
    }
}

export default QuizOptions;
