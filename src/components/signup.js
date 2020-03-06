import React from "react";
import { auth } from "../modules/firebase";

class SignUp extends React.Component {
    state = {
        userName: "",
        password: ""
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSignUp = e => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(
            this.state.userName,
            this.state.password
        )
            .then(data => {
                console.log(data);
                return this.props.history.push("/addQuiz");
            })
            .catch(function(error) {
                console.log(error);
            });
        this.setState({
            userName: "",
            password: ""
        });

        console.log(this.props);
    };
    render() {
        return (
            <div>
                <form onSubmit={e => this.handleSignUp(e)}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            name="userName"
                            onChange={e => this.handleChange(e)}
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            We'll never share your email with anyone else.
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            name="password"
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                    {/* <div className="form-group form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                        />
                        <label className="form-check-label" for="exampleCheck1">
                            Check me out
                        </label>
                    </div> */}
                    <button type="submit" className="btn btn-primary">
                        Sign up
                    </button>
                </form>
            </div>
        );
    }
}

export default SignUp;