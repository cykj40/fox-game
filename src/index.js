const express = require('express');
const app = express();

const init = require('./init');

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(3001);

init();
