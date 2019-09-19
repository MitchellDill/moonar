import React from "react";
import PropTypes from "prop-types";
import Date from "./date.jsx";

const MoonDetail = ({ nextMoon }) => {
  const { phase, day, month } = nextMoon;
  const zeroIndexDate = { zeroDay: day, zeroMonth: month };

  return (
    <div>
      <span>
        {`the next ${phase} moon is on `}
        <Date zeroIndexDate={zeroIndexDate} />.
      </span>
    </div>
  );
};

export default MoonDetail;

MoonDetail.propTypes = {
  nextMoon: PropTypes.object,
};
