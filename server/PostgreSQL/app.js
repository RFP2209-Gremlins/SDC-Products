require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const router = require('./routes.js');

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.get('/loaderio-de57d1e1c2fc50d8dc33f2dc670e82b2', (req, res) => res.send('loaderio-de57d1e1c2fc50d8dc33f2dc670e82b2'));

app.use(router);

app.listen(process.env.PORT, () => {
  console.log('Server listening');
});
