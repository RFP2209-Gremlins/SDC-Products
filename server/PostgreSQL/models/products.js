const db = require('../db');

module.exports = {
  getProducts: db.query('SELECT * FROM product WHERE id <= 5')
};
