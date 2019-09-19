import React from "react";
import PropTypes from "prop-types";

const MoonDetail = ({ nextMoon }) => {
  const { phase, day, month } = nextMoon;
  return <div>{`the next ${phase} moon is on ${month} ${day}.`}</div>;
};

export default MoonDetail;

MoonDetail.propTypes = {
  nextMoon: PropTypes.object,
};
