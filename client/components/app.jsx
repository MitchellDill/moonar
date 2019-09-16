import React, { Component } from "react";
import Moon from "./moon.jsx";
import Mercury from "./mercury.jsx";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      lunationNumber: 0,
      isMercuryRetrograde: false,
      currentMonth: { number: 0, days: [] },
      nextMonth: { number: 1, days: [] },
    };
    this.getPlanetarySchedule = this.getPlanetarySchedule.bind(this);
  }

  async getPlanetarySchedule(month = new Date().getMonth()) {
    const isCurrentMonth = month === new Date().getMonth();
    try {
      const response = await fetch(
        `http://localhost:3000/api/months?month=${month}`
      );
      const jsonResponse = await response.json();
      const { planetarySchedule } = jsonResponse;
      typeof planetarySchedule !== "undefined"
        ? this.receivePlanetarySchedule(planetarySchedule, isCurrentMonth)
        : this.createPlanetarySchedule(month);
    } catch (e) {
      console.error(e);
    } finally {
      isCurrentMonth && month < 11
        ? this.getPlanetarySchedule(month + 1)
        : null;
    }
  }

  async receivePlanetarySchedule(planetarySchedule, isCurrentMonth) {
    const todaysIndex = this.state.date.getDate() + 1;
    const todaysLunation = planetarySchedule[todaysIndex].moon;
    const todaysRetrograde = planetarySchedule[todaysIndex].mercury;
    const currentOrNextMonth = isCurrentMonth ? "currentMonth" : "nextMonth";
    this.setState({
      lunationNumber: todaysLunation,
      isMercuryRetrograde: todaysRetrograde,
      [currentOrNextMonth]: planetarySchedule,
    });
  }

  async createPlanetarySchedule(month) {
    try {
      const cosmicMonth = await this.callMoonAPI(month);
      cosmicMonth
        ? this.postPlanetarySchedule(cosmicMonth)
        : console.log("oops! no response from external API call");
    } catch (e) {
      console.error(e);
    }
  }

  async postPlanetarySchedule(cosmicData) {
    try {
      await fetch(`http://localhost:3000/api/months`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cosmicData),
      });
    } catch (e) {
      console.log("error posting planetary schedule: ", e);
    }
  }

  async callMoonAPI(month) {
    try {
      const response = await fetch(`http://localhost:3000/api/planets/`);
      const jsonResponse = await response.json();
      const { moonsMonth } = jsonResponse;
      return moonsMonth;
    } catch (e) {
      console.error(e);
    }
  }

  componentDidMount() {
    this.getPlanetarySchedule();
    // this.callMoonAPI();
    // this.callMercuryAPI();
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
