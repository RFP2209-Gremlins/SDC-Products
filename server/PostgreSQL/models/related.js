const db = require('../db');

const getRelated = async (product_id, cb) => {
  try {
    let relatedData = await db.query(`SELECT related_id FROM related WHERE product_id=${product_id}`);
    let data = relatedData.rows.map(item => item.related_id);
    cb(null, data);
  } catch (err) {
    cb(err);
  }
};

module.exports = getRelated;
