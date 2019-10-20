import React from "react";
import PropTypes from "prop-types";
import Date from "./date.jsx";
import Zodiac from "./zodiac.jsx";

const MoonDetail = ({ nextMoon, nextMoonCountdown }) => {
  const { phase, day, month } = nextMoon;
  const zeroIndexDate = { zeroDay: day, zeroMonth: month };

  return (
    <div>
      <span>
        {`the next ${phase} moon is on `}
        <Date zeroIndexDate={zeroIndexDate} />
        {`, `}
        <Zodiac day={day} month={month} phase={phase} />
        {`.`}
        {nextMoonCountdown <= 3 && nextMoonCountdown > 0
          ? ` ${nextMoonCountdown} days remain!`
          : null}
      </span>
    </div>
  );
};

export default MoonDetail;

MoonDetail.propTypes = {
  nextMoon: PropTypes.object,
  nextMoonCountdown: PropTypes.number,
};
