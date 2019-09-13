import React, { Component } from "react";
import Moon from "./moon.jsx";
import { DARK_SKY_KEY, LATITUDE, LONGITUDE } from "../../api.config.json";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lunationNumber: 0,
      moonAPIaddress: "https://api.darksky.net/forecast",
      mercuryAPIaddress: "https://mercuryretrogradeapi.com",
    };
  }

  async callMoonAPI(date = new Date()) {
    fetch(
      `${this.state.moonAPIaddress}/${DARK_SKY_KEY}/${LATITUDE},${LONGITUDE}`,
      {
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then(response => {
        response.json();
      })
      .then(jsonResponse => {
        console.log(JSON.stringify(jsonResponse));
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
