import React from "react";
import PropTypes from "prop-types";
import monthNames from "../monthNameList.js";

const renderDateAsText = (day, month) => {
  return day === "undefined" || month === "undefined"
    ? { dayNumber: 32, monthName: "some unknowable time in the future" }
    : { dayNumber: day + 1, monthName: monthNames[month] };
};

const renderNumberAsOrdinal = number => {
  const ordinalEndings = ["th", "st", "nd", "rd"];
  const numberString = number.toString();
  const firstDigit = numberString[0];
  const lastDigit = Number(numberString[numberString.length - 1]);
  return lastDigit > 3 || (firstDigit === "1" && numberString.length !== 1)
    ? numberString.concat(ordinalEndings[0])
    : numberString.concat(ordinalEndings[lastDigit]);
};

const Date = ({ zeroIndexDate }) => {
  const { zeroDay, zeroMonth } = zeroIndexDate;
  const readableDate = renderDateAsText(zeroDay, zeroMonth);
  const { dayNumber, monthName } = readableDate;
  const ordinalDay = dayNumber < 32 ? renderNumberAsOrdinal(dayNumber) : null;
  return <>{`${monthName} ${ordinalDay}`}</>;
};

export default Date;

Date.propTypes = {
  zeroIndexDate: PropTypes.object,
};

Date.defaultProps = {
  zeroIndexDate: { day: undefined, month: undefined },
};
