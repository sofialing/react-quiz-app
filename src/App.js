import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import AddNewQuiz from "./components/AddNewQuiz";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { auth } from "./modules/firebase";
import SignUp from "./components/signup";
import PasswordReset from "./components/PasswordReset";
import NotFound from "./components/NotFound";

class App extends Component {
    state = {
        user: null
    };
    componentDidMount() {
        auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.setState({
                    user: {
                        email: authUser.email
                    }
                });
            } else {
                this.setState({
                    user: null
                });
            }
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div id="App">
                    <Navbar user={this.state.user} />
                    <div className="container my-5">
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={props => (
                                    <Start user={this.state.user} {...props} />
                                )}
                            />
                            <Route path="/quiz/:id" component={Quiz} />
                            <Route
                                path="/addQuiz"
                                render={props => (
                                    <AddNewQuiz
                                        user={this.state.user}
                                        {...props}
                                    />
                                )}
                            />
                            <Route path="/login" component={Login} />
                            <Route path="/signUp" component={SignUp} />
                            <Route
                                path="/PasswordReset"
                                component={PasswordReset}
                            />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
