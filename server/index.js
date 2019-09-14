const express = require('express');
const { fetchLunationNumber, fetchMercuryRetrograde } = require('./apiHelpers');

const PORT = 3000;

const app = express();

app.use(express.json());

app.use(express.static('public'));

app.get('/api/public/moon', async (req, res) => {
  const lunationNumber = await fetchLunationNumber();
  res.send({ moon: lunationNumber });
});

app.get('/api/public/mercury', async (req, res) => {
  const isMercuryRetrograde = await fetchMercuryRetrograde();
  res.send({ isMercuryRetrograde });
});

app.listen(PORT, () => {
  console.log(`moons out goons out on port ${PORT}`);
});
