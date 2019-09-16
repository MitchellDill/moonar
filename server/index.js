/* eslint-disable no-console */
const express = require('express');
const { initializeDatabases } = require('../database/mongoDB');
const { buildCosmicMonth } = require('./apiHelpers');
const { getCosmicMonth, postCosmicMonth } = require('../database/mongoQueries');

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

app.post('api/months', async (req, res) => {
  const month = req.body;
  try {
    await postCosmicMonth(month);
    res.status(201).send('posted! good moon.');
  } catch (e) {
    console.error(e);
    res.send(
      'something went wrong in the post, dear friend. is the moon still there? look up and get back to us.',
    );
  }
});

app.get('/api/planets', async (req, res) => {
  const { month } = req.query;
  let cosmicMonth;
  try {
    cosmicMonth = await buildCosmicMonth(month);
  } catch (e) {
    console.error(e);
  } finally {
    res.send(cosmicMonth);
  }
});

initializeDatabases().then(() => {
  app.listen(PORT, () => {
    console.log(`moons out goons out on port ${PORT}`);
  });
});
