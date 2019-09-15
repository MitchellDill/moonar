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

  async checkIfMonthExistsInDB(month = this.state.date.getMonth()) {
    try {
      const response = await fetch(`http://localhost:3000/api/months`);
      const jsonResponse = await response.json();
      const { planetarySchedule } = jsonResponse;
      planetarySchedule ? null : this.getPlantarySchedule(month);
    } catch (e) {
      console.error(e);
    }
  }

  async getPlantarySchedule(month) {
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
      const { moon } = jsonResponse;
      this.setState({
        lunationNumber: moon,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async callMercuryAPI(month) {
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
    this.setState({
      date: new Date(),
    });
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
