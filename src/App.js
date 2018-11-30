import React, { Component } from "react";

import "./App.css";

import MainPage from "./components/MainPage";
import { Provider } from "./context/context";
import ModalContainer from "./components/ModalContainer/ModalContainer";

class App extends Component {
  render() {
    return (
      <Provider>
        <div className="App">
          <MainPage />
          <ModalContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
