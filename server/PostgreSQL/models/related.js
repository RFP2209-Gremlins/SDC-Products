const db = require('../db');

const getRelated = (product_id) => {
  let query = `SELECT json_agg(related_id) FROM related WHERE product_id=${product_id}`;

  return db.query(query);
};

module.exports = getRelated;
