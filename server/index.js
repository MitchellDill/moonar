/* eslint-disable no-console */
const express = require('express');
const { fetchLunationNumber, fetchMercuryRetrograde } = require('./apiHelpers');
const { getCosmicMonth } = require('../database/mongoHelpers');

const PORT = 3000;

const app = express();

app.use(express.json());

app.use(express.static('public'));

app.get('api/months', async (req, res) => {
  let planetarySchedule;
  const { month } = req.query;
  try {
    planetarySchedule = await getCosmicMonth(month);
  } catch (e) {
    console.error(e);
  } finally {
    res.send({ planetarySchedule });
  }
});

app.get('/api/public/moon', async (req, res) => {
  let lunationNumber;
  try {
    lunationNumber = await fetchLunationNumber();
  } catch (e) {
    console.error(e);
  } finally {
    res.send({ moon: lunationNumber });
  }
});

app.get('/api/public/mercury', async (req, res) => {
  let isMercuryRetrograde;
  try {
    isMercuryRetrograde = await fetchMercuryRetrograde();
  } catch (e) {
    console.error(e);
  } finally {
    res.send({ isMercuryRetrograde });
  }
});

app.listen(PORT, () => {
  console.log(`moons out goons out on port ${PORT}`);
});
