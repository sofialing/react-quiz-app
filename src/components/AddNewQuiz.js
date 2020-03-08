import React from "react";
import AddQuestion from "./AddQuestion";
import { db } from "../modules/firebase";

class AddNewQuiz extends React.Component {
    state = {
        name: "",
        disc: "",
        id: "",
        imgSrc: "",
        addQuestionForm: true,
        error: false,
        errorMessage: ""
    };
    AddNewQuiz = e => {
        e.preventDefault();
        if (this.state.name.length < 4) {
            this.setState({
                error: true,
                errorMessage: "Choose a name before add a new quiz."
            });
            return;
        }

        if (this.state.disc.length < 4) {
            this.setState({
                error: true,
                errorMessage: "Write a description before add a new quiz."
            });
            return;
        }

        // || this.state.disc.length < 4) return;
        db.collection("quizzes")
            .add({
                name: this.state.name,
                description: this.state.disc,
                image: this.state.imgSrc
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
                <h1 className="text-center">Add a new quiz!</h1>
                {this.state.error ? <h1>{this.state.errorMessage}</h1> : ""}
                <form onSubmit={e => this.AddNewQuiz(e)}>
                    <div className="form-group">
                        <label>Add a name.</label>
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
                        <label>Add a description.</label>
                        <input
                            type="text"
                            className="form-control"
                            name="disc"
                            placeholder="Add a description"
                            onChange={e => this.handleOnChange(e)}
                            value={this.state.disc}
                        />
                    </div>
                    <div className="form-group">
                        <label>Add an image url.</label>
                        <input
                            type="text"
                            className="form-control"
                            name="imgSrc"
                            placeholder="Add an image url"
                            onChange={e => this.handleOnChange(e)}
                            value={this.state.imgSrc}
                        />
                    </div>
                    <button className="btn btn-primary">Add new quiz</button>
                </form>
            </div>
        ) : (
            <AddQuestion id={this.state.id} />
        );
    }
}

export default AddNewQuiz;
