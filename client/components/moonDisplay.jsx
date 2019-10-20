import React from "react";
import PropTypes from "prop-types";
import Zodiac from "./zodiac.jsx";
import MoonPhaseImage from "./moonPhaseImage.jsx";
import styles from "../style/main.less";

const moonDisplay = props => {
  const { phase } = props;
  return (
    <div className={styles["moonPhase"]}>
      <span className={styles["header"]}>
        <h1>{`${phase}`}</h1>
        {phase === "new" || phase === "full" ? (
          <h2>
            <Zodiac {...props} />
          </h2>
        ) : null}
      </span>
      <MoonPhaseImage phase={phase} />
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
