import React from "react";
import PropTypes from "prop-types";

const determineMoonPhase = lunationNumber => {
  const possibleMoons = [
    "new",
    "waxing cresent",
    "first quarter",
    "waxing gibbous",
    "full",
    "waning gibbous",
    "last quarter",
    "waning crescent",
    "new",
  ];

  let moonSelectorIndex = 0;
  let lunationUpperBoundary = 0.02;

  // .99 - .01 new
  // .02 - .23

  while (lunationUpperBoundary < lunationNumber) {
    lunationUpperBoundary += moonSelectorIndex % 2 === 0 ? 0.22 : 0.03;
    moonSelectorIndex++;
  }
  return possibleMoons[moonSelectorIndex];
};

const Moon = ({ lunationNumber, loading }) => {
  return (
    <div>
      {loading ? "finding moon..." : determineMoonPhase(lunationNumber)}
    </div>
  );
};

export default Moon;

Moon.propTypes = {
  lunationNumber: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};
