import React from "react";
import PropTypes from "prop-types";
import Zodiac from "./zodiac.jsx";
import styles from "../style/main.less";
import phaseImg from "../images/crescentMoon.png";

const moonDisplay = ({ phase }) => {
  return (
    <div>
      <h1>{`${phase}`}</h1>
      <img className={styles["moonPhase"]} src={phaseImg} />
      {phase === "new" || phase === "full" ? <Zodiac {...props} /> : null}
    </div>
  );
};

export default moonDisplay;

moonDisplay.propTypes = {
  day: PropTypes.number,
  month: PropTypes.number,
  phase: PropTypes.string,
};
