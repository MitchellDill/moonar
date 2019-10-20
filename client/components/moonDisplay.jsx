import React from "react";
import PropTypes from "prop-types";
import MoonPhaseText from "./moonPhaseText.jsx";
import MoonPhaseImage from "./moonPhaseImage.jsx";
import styles from "../style/main.less";

const moonDisplay = props => {
  return (
    <div className={styles["moonPhase"]}>
      <span className={styles["header"]}>
        <MoonPhaseText {...props} />
      </span>
      <MoonPhaseImage phase={props.phase} />
    </div>
  );
};

export default moonDisplay;

moonDisplay.propTypes = {
  day: PropTypes.number,
  month: PropTypes.number,
  phase: PropTypes.string,
};
