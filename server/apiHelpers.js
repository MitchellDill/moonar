const fetch = require('node-fetch');
const { DARK_SKY_KEY, LATITUDE, LONGITUDE } = require('../api.config.json');

const addresses = {
  moon: 'https://api.darksky.net/forecast',
  mercury: 'https://mercuryretrogradeapi.com',
};

const fetchLunationNumber = async (date) => {
  // date parameter expects UTC
  const response = await fetch(
    `${addresses.moon}/${DARK_SKY_KEY}/${LATITUDE},${LONGITUDE},${date}?exclude=currently,hourly,flags`,
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
  const jsonResponse = await response.json();
  console.log(jsonResponse);
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
    if (day < 10) {
      dayString = `0${dayString}`;
    }
    const date = `${currentYear}-${month + 1}-${dayString}`;
    // cosmicDay.moon = await fetchLunationNumber(
    //   Date.UTC(currentYear, month, day),
    // );
    cosmicDay.mercury = await fetchMercuryRetrograde(date);
    cosmicMonth.days.push(cosmicDay);
    console.log(day);
  }
  console.log(cosmicMonth);
};

module.exports = {
  fetchLunationNumber,
  fetchMercuryRetrograde,
  buildCosmicMonth,
};
