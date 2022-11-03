const db = require('../db');

const getStyles = async (product_id, cb) => {
  const data = {
    product_id
  };

  try {
    let stylesData = await db.query(`SELECT style_id, name, sale_price, original_price, default_style FROM styles WHERE product_id=${product_id}`);
    data.results = stylesData.rows;
  } catch (err) {
    cb(err);
  }

  let photosQ = [];
  let skusQ = [];

  for (let i = 0; i < data.results.length; i++) {
    photosQ.push(db.query(`SELECT thumbnail_url, url FROM photos WHERE style_id=${data.results[i].style_id}`));
    skusQ.push(db.query(`SELECT id, size, quantity FROM skus WHERE style_id=${data.results[i].style_id}`));
  }

  try {
    let photosData = await Promise.all(photosQ);
    let skusData = await Promise.all(skusQ);
    for (let i = 0; i < data.results.length; i++) {
      let currentSkus = skusData[i].rows;
      let skus = {};
      for (let j = 0; j < currentSkus.length; j++) {
        skus[currentSkus[j].id] = {quantity: currentSkus[j].quantity, size: currentSkus[j].size};
      }
      data.results[i].photos = photosData[i].rows;
      data.results[i].skus = skus;
    }
  } catch (err) {
    cb(err);
  }

  cb(null, data);
};

module.exports = getStyles;
