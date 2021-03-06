import React from "react";
import PropTypes from "prop-types";
import NextMoonDetail from "./nextMoonDetail.jsx";
import MoonDisplay from "./moonDisplay.jsx";
import moonPhases from "../moonPhaseList.js";

const Moon = ({
  lunationNumber,
  lunarSchedule,
  yesterdaysLunationNumber,
  loading,
  date,
}) => {
  const day = date.getDate() - 1;
  const month = date.getMonth();
  const year = date.getFullYear();
  const currentPhase = determineMoonPhase(
    lunationNumber,
    yesterdaysLunationNumber
  );
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
      {nextMoon.phase === "loading" ? (
        "lookin' for that moon, friend..."
      ) : (
        <NextMoonDetail
          nextMoon={nextMoon}
          nextMoonCountdown={nextMoonCountdown}
        />
      )}
    </>
  );
};

export default Moon;

Moon.propTypes = {
  lunationNumber: PropTypes.number.isRequired,
  lunarSchedule: PropTypes.arrayOf(PropTypes.object),
  yesterdaysLunationNumber: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  date: PropTypes.instanceOf(Date),
};

const determineMoonPhase = (lunationNumber, yesterdaysLunationNumber) => {
  let moonSelectorIndex = 0;
  let lunationUpperBoundary = 0.03;

  while (lunationUpperBoundary <= lunationNumber) {
    lunationUpperBoundary += moonSelectorIndex % 2 === 0 ? 0.22 : 0.03;
    moonSelectorIndex++;
  }

  /*
  clause to account for rare double-new/double-full results, 
  as well as potential 0.04 jump OVER actual new/full moon.
  */

  if (lunationNumber === 0.03 || lunationNumber === 0.53) {
    if (yesterdaysLunationNumber !== 1 && yesterdaysLunationNumber !== 0.5) {
      moonSelectorIndex--;
    }
  }

  return moonPhases[moonSelectorIndex];
};

const findNextSignificantMoon = lunarSchedule => {
  const nextSignificantMoon = {};
  // console.log(lunarSchedule);
  for (let i = 0; i < lunarSchedule.length; i++) {
    const { lunation } = lunarSchedule[i];
    if (
      (lunation > 0.49 && lunation < 0.53) ||
      (lunation === 0.53 && i > 0 && lunarSchedule[i - 1] !== 0.5)
    ) {
      const { day, month } = lunarSchedule[i];
      nextSignificantMoon.phase = "full";
      nextSignificantMoon.day = day;
      nextSignificantMoon.month = month;
      return nextSignificantMoon;
    } else if (
      lunation > 0.99 ||
      lunation < 0.03 ||
      (lunation === 0.03 && i > 0 && lunarSchedule[i - 1] !== 1)
    ) {
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
