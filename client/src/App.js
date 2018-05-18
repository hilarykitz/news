import React, { Component } from "react";
import MainView from "./MainView";
import style from "./dist/styles/main.css";

class App extends Component {
  render() {
    return (
      <main className="container">
        <MainView />
      </main>
    );
  }
}

export default App;
