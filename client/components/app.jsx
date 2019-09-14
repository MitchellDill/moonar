import React, { Component } from "react";
import Moon from "./moon.jsx";
import Mercury from "./mercury.jsx";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lunationNumber: 0,
      isMercuryRetrograde: false,
    };
  }

  async callMoonAPI(date = new Date()) {
    try {
      const response = await fetch(`http://localhost:3000/api/public/moon/`);
      const jsonResponse = await response.json();
      const { moon } = jsonResponse;
      this.setState({
        lunationNumber: moon,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async callMercuryAPI(date = new Date()) {
    try {
      const response = await fetch(`http://localhost:3000/api/public/mercury/`);
      const jsonResponse = await response.json();
      const { isMercuryRetrograde } = jsonResponse;
      this.setState({
        isMercuryRetrograde,
      });
    } catch (e) {
      console.error(e);
    }
  }

  componentDidMount() {
    this.callMoonAPI();
    this.callMercuryAPI();
  }

  render() {
    return (
      <div>
        <Moon lunationNumber={this.state.lunationNumber} />
        <Mercury retrograde={this.state.isMercuryRetrograde} />
      </div>
    );
  }
}
