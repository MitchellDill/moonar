import React from "react";
import PropTypes from "prop-types";
import moonPhases from "../moonPhaseList.js";
import newMoon from "../images/newMoon.png";
import crescentMoon from "../images/crescentMoon.png";
import quarterMoon from "../images/quarterMoon.png";
import gibbousMoon from "../images/gibbousMoon.png";
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
    crescentMoon,
    quarterMoon,
    gibbousMoon,
    fullMoon,
    gibbousMoon,
    quarterMoon,
    crescentMoon,
  ];
  const imageIndex = moonPhases.indexOf(phase);
  return imageArr[imageIndex];
};
