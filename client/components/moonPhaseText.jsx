import React from "react";
import PropTypes from "prop-types";
import Zodiac from "./zodiac.jsx";

const moonPhaseText = props => {
  const { phase } = props;
  return (
    <>
      <h1>
        {phase === "new" || phase === "full" ? `${phase} moon` : `${phase}`}
      </h1>
      {phase === "new" || phase === "full" ? (
        <h2>
          <Zodiac {...props} />
        </h2>
      ) : null}
    </>
  );
};

export default moonPhaseText;

moonPhaseText.propTypes = {
  day: PropTypes.number,
  month: PropTypes.number,
  phase: PropTypes.string,
};

moonPhaseText.defaultProps = {
  phase: "looking for moon...",
};
