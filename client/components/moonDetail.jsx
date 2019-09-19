import React from "react";
import PropTypes from "prop-types";

const renderDateAsText = (day, month) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return { dayNumber: day + 1, monthName: monthNames[month] };
};

const renderNumberAsOrdinal = number => {
  const ordinalEndings = ["th", "st", "nd", "rd"];
  const numberString = number.toString();
  const index = numberString[numberString.length - 1];
  return index > 3
    ? numberString.concat(ordinalEndings[0])
    : numberString.concat(ordinalEndings[index]);
};

const MoonDetail = ({ nextMoon }) => {
  const { phase, day, month } = nextMoon;
  const readableDate = renderDateAsText(day, month);
  const { dayNumber, monthName } = readableDate;
  const ordinalDay = renderNumberAsOrdinal(dayNumber);
  return (
    <div>{`the next ${phase} moon is on ${monthName} ${ordinalDay}.`}</div>
  );
};

export default MoonDetail;

MoonDetail.propTypes = {
  nextMoon: PropTypes.object,
};
