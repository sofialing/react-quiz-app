import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import AddQuestion from "./components/AddQuestion";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div id="App" className="container my-5">
          <Switch>
            <Route exact path="/" component={Start} />
            <Route path="/quiz" component={Quiz} />
            <Route path="/add" component={AddQuestion} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
