import React, { Component } from "react";
import { auth } from "../modules/firebase";
class PasswordReset extends Component {
    state = {
        email: "",
        error: false,
        errorMessage: ""
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        auth.sendPasswordResetEmail(this.state.email)
            .then(() => {
                alert("Password Reset Email Sent!");
                console.log(this.props);
                this.setState({
                    error: false,
                    errorMessage: ""
                });
                return this.props.history.push("/login");
            })
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                errorCode === "auth/invalid-email" &&
                    this.setState({
                        error: true,
                        errorMessage: errorMessage
                    });
                errorCode === "auth/user-not-found" &&
                    this.setState({
                        error: true,
                        errorMessage: errorMessage
                    });
            });
    };

    render() {
        const errorDiv = this.state.error ? (
            <div className="alert alert-warning mt-3" role="alert">
                {this.state.errorMessage}
            </div>
        ) : (
            ""
        );
        return (
            <div>
                <h1 className="text-center">Reset your password!</h1>
                <form onSubmit={e => this.handleSubmit(e)}>
                    {errorDiv}
                    <div className="form-group">
                        <label htmlFor="inputEmail">
                            Write your email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail"
                            aria-describedby="emailHelp"
                            name="email"
                            placeholder="Write your email here"
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default PasswordReset;
