import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import AddNewQuiz from "./components/AddNewQuiz";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { auth } from "./modules/firebase";
import SignUp from "./components/signup";

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
                            <Route exact path="/" component={Start} />
                            <Route path="/quiz/:id" component={Quiz} />
                            <Route path="/addQuiz" component={AddNewQuiz} />
                            <Route path="/login" component={Login} />
                            <Route path="/signUp" component={SignUp} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
