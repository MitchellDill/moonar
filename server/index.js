/* eslint-disable no-console */
const express = require('express');
const { buildCosmicMonth } = require('./apiHelpers');
const { getCosmicMonth, postCosmicMonth } = require('../database/mongoHelpers');

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

app.get('/api/public/moon', async (req, res) => {
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

// app.get('/api/public/mercury', async (req, res) => {
//   let isMercuryRetrograde;
//   try {
//     isMercuryRetrograde = await fetchMercuryRetrograde();
//   } catch (e) {
//     console.error(e);
//   } finally {
//     res.send({ isMercuryRetrograde });
//   }
// });

app.listen(PORT, () => {
  console.log(`moons out goons out on port ${PORT}`);
});
