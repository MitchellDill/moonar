import React, { Component } from "react";
import Moon from "./moon.jsx";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exists: true,
      lunationNumber: 0.25,
    };
  }

  render() {
    return (
      <div>
        <Moon lunationNumber={this.state.lunationNumber} />
      </div>
    );
  }
}
