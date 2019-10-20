import React from "react";
import PropTypes from "prop-types";
import Zodiac from "./zodiac.jsx";
import MoonPhaseImage from "./moonPhaseImage.jsx";
import styles from "../style/main.less";

const moonDisplay = ({ phase }) => {
  return (
    <div className={styles["moonPhase"]}>
      <h1>{`${phase}`}</h1>
      <MoonPhaseImage phase={phase} />
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

moonDisplay.defaultProps = {
  phase: "looking for moon...",
};
