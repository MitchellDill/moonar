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
  }

  async getPlanetarySchedule(month = new Date().getMonth()) {
    const isCurrentMonth = month === new Date().getMonth();
    try {
      const response = await fetch(
        `http://localhost:3000/api/months?month=${month}`
      );
      const jsonResponse = await response.json();
      const [planetarySchedule] = jsonResponse.planetarySchedule;
      console.log("planetary schedule: ", planetarySchedule);
      planetarySchedule.days.length > 0
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
    const todaysIndex = this.state.date.getDate();
    const todaysLunation = planetarySchedule.days[todaysIndex].moon;
    const todaysRetrograde = planetarySchedule.days[todaysIndex].mercury;
    const currentOrNextMonth = isCurrentMonth
      ? this.setState({
          lunationNumber: todaysLunation,
          isMercuryRetrograde: todaysRetrograde,
          currentMonth: planetarySchedule.days,
        })
      : this.setState({ nextMonth: planetarySchedule.days });
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
      const response = await fetch(
        `http://localhost:3000/api/external/months?month=${month}`
      );
      console.log("response: ", response);
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch (e) {
      console.error(e);
    }
  }

  componentDidMount() {
    this.getPlanetarySchedule();
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
