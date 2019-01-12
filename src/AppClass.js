import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    count: 0
  };

  incrementCount = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.incrementCount}>
          I was clicked {this.state.count} times
        </button>
      </div>
    );
  }
}

export default App;
