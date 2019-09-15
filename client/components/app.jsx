import React, { Component } from "react";
import Moon from "./moon.jsx";
import Mercury from "./mercury.jsx";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      lunationNumber: 0,
      isMercuryRetrograde: false,
      currentMonth: { number: 0, dailyLunations: [] },
      nextMonth: { number: 1, dailyLunations: [] },
    };
  }

  async getPlanetarySchedule(month = this.state.date.getMonth()) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/months?month=${month}`
      );
      const jsonResponse = await response.json();
      const { planetarySchedule } = jsonResponse;
      const isCurrentMonth = month === new Date().getMonth();
      planetarySchedule
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
    const todaysLunation = planetarySchedule[todaysIndex].lunation;
    const todaysRetrograde = planetarySchedule[todaysIndex].mercury;
    const currentOrNextMonth = isCurrentMonth ? "currentMonth" : "nextMonth";
    this.setState({
      lunationNumber: todaysLunation,
      isMercuryRetrograde: todaysRetrograde,
      [currentOrNextMonth]: planetarySchedule,
    });
  }

  async createPlanetarySchedule(month) {
    const cosmicMonth = { month };
    try {
      cosmicMonth.mercury = await this.callMercuryAPI(month);
      cosmicMonth.lunation = await this.callMoonAPI(month);
      if (cosmicMonth.mercury && cosmicMonth.lunation) {
        this.postPlanetarySchedule(cosmicMonth);
      }
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
      const response = await fetch(`http://localhost:3000/api/public/moon/`);
      const jsonResponse = await response.json();
      const { moonsMonth } = jsonResponse;
      return moonsMonth;
    } catch (e) {
      console.error(e);
    }
  }

  async callMercuryAPI(month) {
    try {
      const response = await fetch(`http://localhost:3000/api/public/mercury/`);
      const jsonResponse = await response.json();
      const { mercurysMonth } = jsonResponse;
      return mercurysMonth;
    } catch (e) {
      console.error(e);
    }
  }

  componentDidMount() {
    this.setState(
      {
        date: new Date(),
      },
      this.getPlanetarySchedule()
    );
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
