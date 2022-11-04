const db = require('../db');

const getStyles = async (product_id) => {
  let data;

  try {
    let query = `SELECT json_build_object(
      'product_id', ${product_id},
      'results', (SELECT json_agg(
        json_build_object(
          'style_id', id,
          'name', name,
          'original_price', original_price,
          'sale_price', sale_price,
          'default?', default_style
        )
      ) FROM styles WHERE product_id=${product_id})
    )`;
    data = await db.query(query);
    data = data.rows[0].json_build_object;
  } catch (err) {
    return err;
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
      let currentPhotos = photosData[i].rows;
      if (!currentPhotos.length) {
        data.results[i].photos = [{ thumbnail_url: null, url: null }];
      } else {
        data.results[i].photos = currentPhotos.rows;
      }
      let currentSkus = skusData[i].rows;
      let skus = {};
      if (!currentSkus.length) {
        skus.null = { quantity: null, size: null };
      } else {
        for (let j = 0; j < currentSkus.length; j++) {
          skus[currentSkus[j].id] = { quantity: currentSkus[j].quantity, size: currentSkus[j].size };
        }
      }
      data.results[i].skus = skus;
    }
    return data;
  } catch (err) {
    return err;
  }
};

module.exports = getStyles;
