const db = require('../db');

const getProducts = (page, count) => {
  page = page || 1;
  count = count || 5;

  return db.query(`SELECT * FROM product OFFSET ${(page - 1) * count} LIMIT ${count}`);
};

module.exports = getProducts;
