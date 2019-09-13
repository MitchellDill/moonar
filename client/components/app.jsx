import React, { Component } from "react";
import Moon from "./moon.jsx";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lunationNumber: 0,
    };
  }

  async callMoonAPI(date = new Date()) {
    const response = await fetch(`http://localhost:3000/api/darksky/`);
    const jsonResponse = await response.json();
    const { moon } = jsonResponse;
    this.setState({
      lunationNumber: moon,
    });
  }

  componentDidMount() {
    this.callMoonAPI();
  }

  render() {
    return (
      <div>
        <Moon lunationNumber={this.state.lunationNumber} />
      </div>
    );
  }
}
