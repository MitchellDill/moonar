import React from "react";
import PropTypes from "prop-types";
import moonPhases from "../moonPhaseList.js";
import newMoon from "../images/newMoon.png";
import waxingCrescentMoon from "../images/crescentMoonWaxing.png";
import waningCrescentMoon from "../images/crescentMoonWaning.png";
import firstQuarterMoon from "../images/quarterMoonFirst.png";
import lastQuarterMoon from "../images/quarterMoonLast.png";
import waxingGibbousMoon from "../images/gibbousMoonWaxing.png";
import waningGibbousMoon from "../images/gibbousMoonWaning.png";
import fullMoon from "../images/fullMoon.png";

const moonPhaseImage = ({ phase }) => {
  return (
    <>
      <img src={selectMoonPhaseImage(phase)} alt={`${phase} drawing`} />
    </>
  );
};

export default moonPhaseImage;

moonPhaseImage.propTypes = {
  phase: PropTypes.string,
};

moonPhaseImage.defaultProps = {};

const selectMoonPhaseImage = phase => {
  const imageArr = [
    newMoon,
    waxingCrescentMoon,
    firstQuarterMoon,
    waxingGibbousMoon,
    fullMoon,
    waningGibbousMoon,
    lastQuarterMoon,
    waningCrescentMoon,
  ];
  const imageIndex = moonPhases.indexOf(phase);
  return imageArr[imageIndex];
};
