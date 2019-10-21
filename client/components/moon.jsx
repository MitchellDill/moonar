import React from "react";
import PropTypes from "prop-types";
import NextMoonDetail from "./nextMoonDetail.jsx";
import MoonDisplay from "./moonDisplay.jsx";
import moonPhases from "../moonPhaseList.js";

const Moon = ({ lunationNumber, lunarSchedule, loading, date }) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const currentPhase = determineMoonPhase(lunationNumber);
  const nextMoon = findNextSignificantMoon(lunarSchedule);
  const nextMoonCountdown = findDaysTilNextSignificantMoon(
    day,
    month,
    nextMoon.day,
    nextMoon.month,
    year
  );

  return (
    <>
      {loading ? (
        "finding moon..."
      ) : (
        <MoonDisplay phase={currentPhase} day={day} month={month} />
      )}
      <NextMoonDetail
        nextMoon={nextMoon}
        nextMoonCountdown={nextMoonCountdown}
      />
    </>
  );
};

export default Moon;

Moon.propTypes = {
  lunationNumber: PropTypes.number.isRequired,
  lunarSchedule: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired,
  date: PropTypes.instanceOf(Date),
};

const determineMoonPhase = lunationNumber => {
  let moonSelectorIndex = 0;
  let lunationUpperBoundary = 0.02;

  while (lunationUpperBoundary < lunationNumber) {
    lunationUpperBoundary += moonSelectorIndex % 2 === 0 ? 0.22 : 0.03;
    moonSelectorIndex++;
  }
  return moonPhases[moonSelectorIndex];
};

const findNextSignificantMoon = lunarSchedule => {
  const nextSignificantMoon = {};
  console.log(lunarSchedule);
  for (let i = 0; i < lunarSchedule.length; i++) {
    const { lunation } = lunarSchedule[i];
    if (lunation > 0.48 && lunation < 0.52) {
      const { day, month } = lunarSchedule[i];
      nextSignificantMoon.phase = "full";
      nextSignificantMoon.day = day;
      nextSignificantMoon.month = month;
      return nextSignificantMoon;
    } else if (lunation > 0.98 || lunation < 0.02) {
      const { day, month } = lunarSchedule[i];
      nextSignificantMoon.phase = "new";
      nextSignificantMoon.day = day;
      nextSignificantMoon.month = month;
      return nextSignificantMoon;
    }
  }
  return { phase: "loading", day: 1, month: 1 };
};

const findDaysTilNextSignificantMoon = (
  currentDay,
  currentMonth,
  nextDay,
  nextMonth,
  currentYear
) => {
  let daysInMonth;
  if (currentMonth === 1) {
    if (currentYear % 4 === 0) {
      daysInMonth = 28;
    } else {
      daysInMonth = 27;
    }
  } else if (currentMonth % 2 === 0 && currentMonth < 7) {
    daysInMonth = 31;
  } else if (currentMonth % 2 !== 0 && currentMonth > 6) {
    daysInMonth = 31;
  } else {
    daysInMonth = 30;
  }
  if (nextMonth > currentMonth || nextMonth - currentMonth === -11) {
    nextDay += daysInMonth;
  }
  return nextDay - currentDay;
};
