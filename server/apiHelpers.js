const fetch = require('node-fetch');
const { DARK_SKY_KEY, LATITUDE, LONGITUDE } = require('../api.config.json');

const addresses = {
  moon: 'https://api.darksky.net/forecast',
  mercury: 'https://mercuryretrogradeapi.com',
};

const fetchLunationNumber = async () => {
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

module.exports = { fetchLunationNumber, fetchMercuryRetrograde };
