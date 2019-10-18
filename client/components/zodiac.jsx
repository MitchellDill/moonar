import React from "react";
import PropTypes from "prop-types";
import zodiacList from "../zodiacList.js";

const Zodiac = props => {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();

  return <div>{determineZodiac(day, month)}</div>;
};

export default Zodiac;

Zodiac.propTypes = {};

const determineZodiac = (day, month) => {
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
  return day < monthsZodiacCutoff ? zodiacList[month] : zodiacList[month + 1];
};
