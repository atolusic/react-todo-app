import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import MainPage from "./components/MainPage";
import { Provider } from "./context/context";
import ModalContainer from "./components/ModalContainer/ModalContainer";
import TodoDetails from "./components/TodoDetails";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/todos/:id" component={TodoDetails} />
            </Switch>
          </div>
        </Router>
        <ModalContainer />
      </Provider>
    );
  }
}

export default App;
