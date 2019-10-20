import React from "react";
import PropTypes from "prop-types";
import Zodiac from "./zodiac.jsx";
import styles from "../style/main.less";
import phaseImg from "../images/gibbousMoon.png";

const moonDisplay = ({ phase }) => {
  return (
    <div className={styles["moonPhase"]}>
      <h1>{`${phase}`}</h1>
      <img src={phaseImg} />
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
