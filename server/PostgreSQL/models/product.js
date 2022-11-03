const db = require('../db');

const getProduct = async (product_id, cb) => {
  try {
    let productData = await db.query(`SELECT * FROM product WHERE id=${product_id}`);
    let featuresData = await db.query(`SELECT feature, value FROM features WHERE product_id=${product_id}`);
    let data = productData.rows[0];
    data.features = featuresData.rows;
    cb(null, data);
  } catch (err) {
    cb(err);
  }
};

module.exports = getProduct;
