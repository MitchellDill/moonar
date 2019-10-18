import React from "react";
import PropTypes from "prop-types";
import MoonDetail from "./moonDetail.jsx";
import Zodiac from "./zodiac.jsx";
import moonPhases from "../moonPhaseList.js";

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

const Moon = ({ lunationNumber, lunarSchedule, loading }) => {
  return (
    <div>
      <>{loading ? "finding moon..." : determineMoonPhase(lunationNumber)}</>
      <>
        <MoonDetail nextMoon={findNextSignificantMoon(lunarSchedule)} />
        <Zodiac />
      </>
    </div>
  );
};

export default Moon;

Moon.propTypes = {
  lunationNumber: PropTypes.number.isRequired,
  lunarSchedule: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired,
};
