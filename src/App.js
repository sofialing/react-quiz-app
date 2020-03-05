import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import AddNewQuiz from "./components/AddNewQuiz";
import Navbar from "./components/Navbar";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div id="App">
                    <Navbar />
                    <div className="container my-5">
                        <Switch>
                            <Route exact path="/" component={Start} />
                            <Route path="/quiz/:id" component={Quiz} />
                            <Route path="/addQuiz" component={AddNewQuiz} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
