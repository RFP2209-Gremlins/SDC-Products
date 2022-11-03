const db = require('../db');

const getProducts = async (page, count, cb) => {
  page = page || 1;
  count = count || 5;

  try {
    let data = await db.query(`SELECT * FROM product WHERE id > ${(page - 1) * count} LIMIT ${count}`);
    cb(null, data.rows);
  } catch (err) {
    cb(err);
  }
};

module.exports = getProducts;
