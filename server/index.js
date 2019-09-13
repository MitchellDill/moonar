const express = require('express');
const { fetchLunationNumber } = require('./apiHelpers');

const PORT = 3000;

const app = express();

app.use(express.json());

app.use(express.static('public'));

app.get('/api/darksky', async (req, res) => {
  const lunationNumber = await fetchLunationNumber();
  console.log(lunationNumber);
  res.send({ moon: lunationNumber });
});

app.listen(PORT, () => {
  console.log(`moons out goons out on port ${PORT}`);
});
