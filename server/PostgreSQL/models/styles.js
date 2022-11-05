const db = require('../db');

const getStyles = async (product_id) => {
  let query = `SELECT json_build_object(
    'product_id', ${product_id},
    'results', (SELECT json_agg(
      json_build_object(
        'style_id', id,
        'name', name,
        'original_price', original_price,
        'sale_price', sale_price,
        'default?', default_style,
        'photos', (SELECT json_agg(
          json_build_object(
            'thumbnail_url', thumbnail_url,
            'url', url
          )
        ) FROM photos WHERE style_id=styles.id),
        'skus', (SELECT json_object_agg(
          id, json_build_object(
            'quanity', quantity,
            'size', size
          )
        ) FROM skus WHERE style_id=styles.id)
      )
    ) FROM styles WHERE product_id=${product_id})
  )`;

  try {
    let data = await db.query(query);
    data = data.rows[0].json_build_object;
    let styles = data.results;
    styles.forEach(style => {
      if (!style.photos) {
        style.photos = [{ thumbnail_url: null, url: null }];
      }
      if (!style.skus) {
        style.skus = { null: { quantity: null, size: null } };
      }
    });
    return data;
  } catch (err) {
    return err;
  }
};

module.exports = getStyles;
