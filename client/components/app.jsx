import React, { Component } from "react";
import Moon from "./moon.jsx";
import Mercury from "./mercury.jsx";
import Modal from "./modal.jsx";
import styles from "../style/main.less";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      lunationNumber: 2,
      yesterdaysLunationNumber: 2,
      isMercuryRetrograde: false,
      currentMonth: [],
      nextMonth: [],
      currentlyFetching: false,
      showModal: false,
      exitModalAnimating: false,
    };
    this.exitModal = this.exitModal.bind(this);
  }

  //months are all 0-index
  //days are all 0-index in app--be aware that .getDate returns 1-index, however!

  async getPlanetarySchedule(
    month = this.state.date.getMonth(),
    year = this.state.date.getFullYear()
  ) {
    const isCurrentMonth = month === new Date().getMonth();
    try {
      const response = await fetch(
        `http://moonar.us-east-2.elasticbeanstalk.com/api/months?month=${month}&year=${year}`
      );
      const jsonResponse = await response.json();
      const [planetarySchedule] = jsonResponse.planetarySchedule;
      console.log("planetary schedule: ", planetarySchedule);
      planetarySchedule
        ? this.receivePlanetarySchedule(planetarySchedule, isCurrentMonth)
        : this.createPlanetarySchedule(month, isCurrentMonth, year);
    } catch (e) {
      console.error(e);
    } finally {
      isCurrentMonth && month < 11
        ? this.getPlanetarySchedule(month + 1)
        : isCurrentMonth && month >= 11
        ? this.getPlanetarySchedule(0, year + 1)
        : null;
    }
  }

  async receivePlanetarySchedule(planetarySchedule, isCurrentMonth) {
    if (isCurrentMonth) {
      const todaysIndex = this.state.date.getDate() - 1;
      const todaysLunation = planetarySchedule.days[todaysIndex].moon;
      const todaysRetrograde = planetarySchedule.days[todaysIndex].mercury;
      const yesterdaysIndex = todaysIndex > 0 ? todaysIndex - 1 : 0;
      const yesterdaysLunation =
        todaysIndex !== yesterdaysIndex
          ? planetarySchedule.days[yesterdaysIndex].moon
          : 2;
      this.setState({
        lunationNumber: todaysLunation,
        yesterdaysLunationNumber: yesterdaysLunation,
        isMercuryRetrograde: todaysRetrograde,
        currentMonth: planetarySchedule.days,
        currentlyFetching: false,
      });
    } else {
      this.setState({ nextMonth: planetarySchedule.days });
    }
  }

  async createPlanetarySchedule(month, isCurrentMonth, year) {
    isCurrentMonth ? this.setState({ currentlyFetching: true }) : null;
    try {
      const cosmicMonth = await this.callMoonAPI(month, year);
      cosmicMonth
        ? this.postPlanetarySchedule(cosmicMonth, isCurrentMonth)
        : console.log("oops! no response from external API call");
    } catch (e) {
      console.error(e);
    }
  }

  async postPlanetarySchedule(cosmicData, isCurrentMonth) {
    try {
      await fetch(`http://moonar.us-east-2.elasticbeanstalk.com/api/months`, {
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

  async callMoonAPI(month, year) {
    try {
      const response = await fetch(
        `http://moonar.us-east-2.elasticbeanstalk.com/api/external/months?month=${month}&year=${year}`
      );
      const jsonResponse = await response.json();
      // console.log("response: ", jsonResponse);
      return jsonResponse;
    } catch (e) {
      console.error(e);
    }
  }

  compileUpcomingLunation() {
    const { currentMonth, nextMonth, date } = this.state;
    const tomorrow = date.getDate();
    const month = date.getMonth();

    const mapShortTermLunarCalendar = (nextDays, startingDate, month) => {
      return nextDays.map((d, i) => {
        return { lunation: d.moon, day: startingDate + i, month };
      });
    };

    let nextDays = mapShortTermLunarCalendar(
      currentMonth.slice(tomorrow),
      tomorrow,
      month
    );

    if (nextDays.length < 17) {
      const diff = 17 - nextDays.length;
      const nextNextDays = mapShortTermLunarCalendar(
        nextMonth.slice(0, diff),
        0,
        month + 1
      );
      nextDays = [...nextDays, ...nextNextDays];
    }
    return nextDays;
  }

  showModal(e) {
    this.setState({
      showModal: true,
    });
  }

  exitModal(e) {
    this.setState(
      {
        exitModalAnimating: true,
      },
      this.hideModal()
    );
  }

  hideModal(e) {
    setTimeout(() => {
      this.setState({
        showModal: false,
        exitModalAnimating: false,
      });
    }, 500);
  }

  componentDidMount() {
    this.getPlanetarySchedule();
  }

  render() {
    return (
      <>
        <div onClick={e => this.exitModal(e)}>
          <Moon
            lunationNumber={this.state.lunationNumber}
            lunarSchedule={this.compileUpcomingLunation()}
            yesterdaysLunationNumber={this.state.yesterdaysLunationNumber}
            loading={this.state.currentlyFetching}
            date={this.state.date}
          />
          {this.state.isMercuryRetrograde || this.state.currentlyFetching ? (
            <Mercury
              retrograde={this.state.isMercuryRetrograde}
              loading={this.state.currentlyFetching}
            />
          ) : null}
        </div>
        <h4
          onClick={e => this.showModal(e)}
          className={styles["clickableText"]}
        >
          about
        </h4>
        {this.state.showModal ? (
          <Modal
            exitModal={this.exitModal}
            exitModalAnimating={this.state.exitModalAnimating}
          />
        ) : null}
      </>
    );
  }
}
