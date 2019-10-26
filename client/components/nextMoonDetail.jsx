import React from "react";
import PropTypes from "prop-types";
import Date from "./date.jsx";
import Zodiac from "./zodiac.jsx";

const NextMoonDetail = ({ nextMoon }) => {
  const { phase, day, month, countdown } = nextMoon;
  const zeroIndexDate = { zeroDay: day, zeroMonth: month };

  return (
    <div>
      <span>
        {`the next ${phase} moon is on `}
        <Date zeroIndexDate={zeroIndexDate} />
        {`, `}
        <Zodiac day={day} month={month} phase={phase} />
        {`.`}
        {countdown <= 3 && countdown > 1
          ? ` ${countdown} days remain!`
          : countdown === 1
          ? ` Only ${countdown} day remains!`
          : null}
      </span>
    </div>
  );
};

export default NextMoonDetail;

NextMoonDetail.propTypes = {
  nextMoon: PropTypes.object,
  countdown: PropTypes.number,
};
