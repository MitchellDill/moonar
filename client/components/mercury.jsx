import React from "react";
import PropTypes from "prop-types";

const Mercury = ({ retrograde }) => {
  return (
    <div>
      {retrograde ? "mercury retrograde!" : "mercury NOT retrograde. phew"}
    </div>
  );
};

export default Mercury;

Mercury.propTypes = {
  retrograde: PropTypes.bool.isRequired,
};
