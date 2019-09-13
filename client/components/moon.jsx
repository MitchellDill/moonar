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
  ];

  let moonSelectorIndex = 0;
  let lunationUpperBoundary = 0;

  while (lunationUpperBoundary < lunationNumber) {
    lunationUpperBoundary += moonSelectorIndex % 2 === 0 ? 0.24 : 0.01;
    moonSelectorIndex++;
  }
  return possibleMoons[moonSelectorIndex];
};

const Moon = props => {
  return <div>{determineMoonPhase(props.lunationNumber)}</div>;
};

export default Moon;

Moon.propTypes = {
  lunationNumber: PropTypes.number.isRequired,
};
