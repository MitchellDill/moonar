import React, { useState } from "react";
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
import styles from "../style/main.less";

const moonPhaseImage = ({ phase }) => {
  const [borderHighlight, showBorderHighlight] = useState(false);
  let borderClass = borderHighlight
    ? styles["borderHighlight"]
    : styles["borderUnhighlight"];

  return (
    <div
      onClick={() => {
        borderHighlight ? showBorderHighlight(false) : null;
      }}
    >
      <div id={borderClass}>
        <img
          src={selectMoonPhaseImage(phase)}
          alt={`${phase} drawing`}
          onClick={() => {
            showBorderHighlight(!borderHighlight);
          }}
        />
      </div>
    </div>
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
    newMoon,
  ];
  const imageIndex = moonPhases.indexOf(phase);
  return imageArr[imageIndex];
};
