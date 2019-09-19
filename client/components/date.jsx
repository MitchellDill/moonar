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

const Date = ({ zeroIndexDate }) => {
  const { zeroDay, zeroMonth } = zeroIndexDate;
  const readableDate = renderDateAsText(zeroDay, zeroMonth);
  const { dayNumber, monthName } = readableDate;
  const ordinalDay = renderNumberAsOrdinal(dayNumber);
  return <>{`${monthName} ${ordinalDay}`}</>;
};

export default Date;

Date.propTypes = {
  zeroIndexDate: PropTypes.object,
};
