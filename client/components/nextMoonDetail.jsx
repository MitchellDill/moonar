import React from "react";
import PropTypes from "prop-types";
import Date from "./date.jsx";
import Zodiac from "./zodiac.jsx";

const NextMoonDetail = ({ nextMoon, nextMoonCountdown }) => {
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
        {nextMoonCountdown <= 3 && nextMoonCountdown > 1
          ? ` ${nextMoonCountdown} days remain!`
          : nextMoonCountdown === 1
          ? ` Only ${nextMoonCountdown} day remains!`
          : null}
      </span>
    </div>
  );
};

export default NextMoonDetail;

NextMoonDetail.propTypes = {
  nextMoon: PropTypes.object,
  nextMoonCountdown: PropTypes.number,
};
