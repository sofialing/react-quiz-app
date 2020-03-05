import React from "react";
import AddQuestion from "./AddQuestion";
import { db } from "../modules/firebase";

class AddNewQuiz extends React.Component {
  state = {
    name: "",
    disc: "",
    id: "",
    addQuestionForm: true
  };
  AddNewQuiz = e => {
    e.preventDefault();
    db.collection("quizzes")
      .add({
        name: this.state.name,
        description: this.state.disc
      })
      .then(data =>
        this.setState({
          id: data.id
        })
      )
      .catch(error => console.log(error));
    this.setState({
      addQuestionForm: false
    });
  };

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return this.state.addQuestionForm ? (
      <div>
        <form onSubmit={e => this.AddNewQuiz(e)}>
          <div className="form-group">
            <label>Add a name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Add a name"
              name="name"
              onChange={e => this.handleOnChange(e)}
              value={this.state.name}
            />
          </div>
          <div className="form-group">
            <label>Add a description </label>
            <input
              type="text"
              className="form-control"
              name="disc"
              placeholder="Add a description"
              onChange={e => this.handleOnChange(e)}
              value={this.state.disc}
            />
          </div>
          <button>Add new quiz</button>
        </form>
      </div>
    ) : (
      <AddQuestion id={this.state.id} />
    );
  }
}

export default AddNewQuiz;
