const fetch = require('node-fetch');
const { DARK_SKY_KEY, LATITUDE, LONGITUDE } = require('../api.config.json');

const addresses = {
  moon: 'https://api.darksky.net/forecast',
  mercury: 'https://mercuryretrogradeapi.com',
};

const fetchLunationNumber = async (day) => {
  const response = await fetch(
    `${addresses.moon}/${DARK_SKY_KEY}/${LATITUDE},${LONGITUDE}?exclude=currently,minutely,hourly,alerts,flags`,
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
  const jsonResponse = await response.json();
  const { moonPhase } = jsonResponse.daily.data[0];
  return moonPhase;
};

const fetchMercuryRetrograde = async () => {
  const response = await fetch(`${addresses.mercury}`, {
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
};

module.exports = { fetchLunationNumber, fetchMercuryRetrograde };
