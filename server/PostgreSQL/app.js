require('dotenv').config();
const express = require('express');
const db = require('./db');

const app = express();

app.use(express.json());

app.get('/test', (req, res) => {
  db.query('SELECT * FROM product WHERE id=1', (err, product) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(product);
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});
