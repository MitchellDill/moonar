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
      currentMonth: [],
      nextMonth: [],
      currentlyFetching: false,
    };
  }

  //months are all 0-index

  async getPlanetarySchedule(month = this.state.date.getMonth()) {
    const isCurrentMonth = month === new Date().getMonth();
    try {
      const response = await fetch(
        `http://localhost:3000/api/months?month=${month}`
      );
      const jsonResponse = await response.json();
      const [planetarySchedule] = jsonResponse.planetarySchedule;
      console.log("planetary schedule: ", planetarySchedule);
      planetarySchedule
        ? this.receivePlanetarySchedule(planetarySchedule, isCurrentMonth)
        : this.createPlanetarySchedule(month, isCurrentMonth);
    } catch (e) {
      console.error(e);
    } finally {
      isCurrentMonth && month < 11
        ? this.getPlanetarySchedule(month + 1)
        : null;
    }
  }

  async receivePlanetarySchedule(planetarySchedule, isCurrentMonth) {
    if (isCurrentMonth) {
      const todaysIndex = this.state.date.getDate();
      const todaysLunation = planetarySchedule.days[todaysIndex].moon;
      const todaysRetrograde = planetarySchedule.days[todaysIndex].mercury;
      this.setState({
        lunationNumber: todaysLunation,
        isMercuryRetrograde: todaysRetrograde,
        currentMonth: planetarySchedule.days,
        currentlyFetching: false,
      });
    } else {
      this.setState({ nextMonth: planetarySchedule.days });
    }
  }

  async createPlanetarySchedule(month, isCurrentMonth) {
    isCurrentMonth ? this.setState({ currentlyFetching: true }) : null;
    try {
      const cosmicMonth = await this.callMoonAPI(month);
      cosmicMonth
        ? this.postPlanetarySchedule(cosmicMonth, isCurrentMonth)
        : console.log("oops! no response from external API call");
    } catch (e) {
      console.error(e);
    }
  }

  async postPlanetarySchedule(cosmicData, isCurrentMonth) {
    try {
      await fetch(`http://localhost:3000/api/months`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cosmicData),
      });
      isCurrentMonth
        ? this.getPlanetarySchedule()
        : this.getPlanetarySchedule(this.state.date.getMonth() + 1);
    } catch (e) {
      console.log("error posting planetary schedule: ", e);
    }
  }

  async callMoonAPI(month) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/external/months?month=${month}`
      );
      const jsonResponse = await response.json();
      console.log("response: ", jsonResponse);
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
        <Moon
          lunationNumber={this.state.lunationNumber}
          loading={this.state.currentlyFetching}
        />
        <Mercury
          retrograde={this.state.isMercuryRetrograde}
          loading={this.state.currentlyFetching}
        />
      </div>
    );
  }
}
