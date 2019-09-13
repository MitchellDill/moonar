const fetch = require('node-fetch');
const { DARK_SKY_KEY, LATITUDE, LONGITUDE } = require('../api.config.json');

const addresses = {
  moon: 'https://api.darksky.net/forecast',
  mercury: 'https://mercuryretrogradeapi.com',
};

const fetchLunationNumber = async () => {
  const weather = await fetch(
    `${addresses.moon}/${DARK_SKY_KEY}/${LATITUDE},${LONGITUDE}?exclude=currently,minutely,hourly,alerts,flags`,
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
  const jsonWeather = await weather.json();
  return jsonWeather;
};

module.exports = { fetchLunationNumber };
