import React, { Component } from "react";

class QuizOptions extends Component {
<<<<<<< HEAD
	state = {
		userAnswer: [],
		message: false
	}

	handleChange = e => {
		const { name } = e.target
		const { userAnswer } = this.state
		const { correct } = this.props

		if (userAnswer.includes(name)) {
			const newArray = [...userAnswer]
			const i = newArray.indexOf(name)
			newArray.splice(i, 1)
			this.setState({ userAnswer: newArray, message: false })
		} else if (userAnswer.length === correct.length) {
			e.preventDefault()
			this.setState({
				message: `You can only select ${correct.length} options`
			})
		} else {
			this.setState(prevState => ({
				userAnswer: [...prevState.userAnswer, name]
			}))
		}
	}

	checkAnswer = e => {
		e.preventDefault()

		const { correct, point } = this.props
		const { userAnswer } = this.state

		// Plocka ut de rätta svaren som användaren har valt
		const correctAnswers = correct.filter(answer => userAnswer.includes(answer))

		// Räkna ut poängen (totalpoäng delat på antal rätta svar)
		let totalPoint = (Number(point) / correct.length) * correctAnswers.length

		this.setState({ userAnswer: [] })
		this.props.onUpdateScore(totalPoint)
	}

	render() {
		const checkboxes = this.props.options.map((option, i) => (
			<div className='custom-control custom-checkbox' key={i}>
				<input
					type='checkbox'
					className='custom-control-input'
					id={`${option}-${i}`}
					name={option}
					onChange={this.handleChange}
					checked={this.state.userAnswer.includes(option)}
				/>
				<label className='custom-control-label' htmlFor={`${option}-${i}`}>
					{option}
				</label>
			</div>
		))

		return (
			<form onSubmit={this.checkAnswer}>
				{checkboxes}
				{this.state.message ? (
					<div className='alert alert-warning my-3'>{this.state.message}</div>
				) : (
					''
				)}
				<button className='btn btn-primary mt-3'>Next question</button>
			</form>
		)
	}
=======
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
>>>>>>> 840f58a2f4e779e6839451814664b19ad0d9125f
}

export default QuizOptions;
