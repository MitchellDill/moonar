import React from "react";
import PropTypes from "prop-types";
import zodiacSigns from "../zodiacSignList.js";

const Zodiac = ({ day, month, phase }) => {
  return <>in {determineZodiacOfMoon(day, month, phase)}</>;
};

export default Zodiac;

const determineZodiacOfMoon = (day, month, phase) => {
  // zero indexed day and month
  let monthsZodiacCutoff;
  if (month === 0 || month === 3) {
    monthsZodiacCutoff = 20;
  } else if (month === 1) {
    monthsZodiacCutoff = 19;
  } else if (month === 2 || month === 4 || month === 5) {
    monthsZodiacCutoff = 21;
  } else if (month >= 6 && month <= 9) {
    monthsZodiacCutoff = 23;
  } else if (month >= 10) {
    monthsZodiacCutoff = 22;
  }

  if (phase === "full") {
    month = flipZodiacForFullMoon(month);
  }

  return day < monthsZodiacCutoff ? zodiacSigns[month] : zodiacSigns[month + 1];
};

const flipZodiacForFullMoon = month => {
  return month < 6 ? month + 6 : month - 6;
};

Zodiac.propTypes = {
  day: PropTypes.number,
  month: PropTypes.number,
  phase: PropTypes.string,
};
