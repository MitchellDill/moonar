const express = require('express');

const PORT = 3000;

const app = express();

app.use(express.json());

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`moons out goons out on port ${PORT}`);
});
