const fetch = require('node-fetch');
const { DARK_SKY_KEY, LATITUDE, LONGITUDE } = require('../api.config.json');

const addresses = {
  moon: 'https://api.darksky.net/forecast',
  mercury: 'https://mercuryretrogradeapi.com',
};

const fetchLunationNumber = async (date) => {
  // date parameter expects [YYYY]-[MM]-[DD]T[HH]:[MM]:[SS][timezone]
  const response = await fetch(
    `${addresses.moon}/${DARK_SKY_KEY}/${LATITUDE},${LONGITUDE},${date}?exclude=currently,hourly,flags`,
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
  const jsonResponse = await response.json();
  const { moonPhase } = jsonResponse.daily.data[0];
  return moonPhase;
};

const fetchMercuryRetrograde = async (date) => {
  // date parameter expects YYYY-MM-DD
  const response = await fetch(`${addresses.mercury}?date=${date}`, {
    headers: { 'Content-Type': 'application/json' },
  });
  const jsonResponse = await response.json();
  return jsonResponse.is_retrograde;
};

const buildCosmicMonth = async (month) => {
  const currentYear = new Date().getFullYear();
  let daysInMonth;
  if (month === 1) {
    if (currentYear % 4 === 0) {
      daysInMonth = 28;
    } else {
      daysInMonth = 27;
    }
  } else if (month % 2 === 0 && month < 7) {
    daysInMonth = 31;
  } else if (month % 2 !== 0 && month > 6) {
    daysInMonth = 31;
  } else {
    daysInMonth = 30;
  }

  const cosmicMonth = { number: month, days: [] };
  for (let day = 1; day <= daysInMonth; day++) {
    const cosmicDay = {};
    let dayString = day.toString();
    const monthNumber = Number(month) + 1;
    let monthString = monthNumber.toString();
    if (day < 10) {
      dayString = `0${dayString}`;
    }
    if (monthNumber < 10) {
      monthString = `0${monthString}`;
    }
    const dateForMoon = `${currentYear}-${monthString}-${dayString}T20:00:00`;
    const dateForMercury = `${currentYear}-${monthString}-${dayString}`;

    cosmicDay.moon = await fetchLunationNumber(dateForMoon);
    cosmicDay.mercury = await fetchMercuryRetrograde(dateForMercury);
    cosmicMonth.days.push(cosmicDay);
  }
  return cosmicMonth;
};

module.exports = {
  buildCosmicMonth,
};
