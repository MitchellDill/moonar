import React from "react";
import PropTypes from "prop-types";

const Mercury = ({ retrograde, loading }) => {
  return (
    <div>
      {loading
        ? "finding mercury..."
        : retrograde
        ? "mercury retrograde! hope it doesn't break the site"
        : null}
    </div>
  );
};

export default Mercury;

Mercury.propTypes = {
  retrograde: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};
