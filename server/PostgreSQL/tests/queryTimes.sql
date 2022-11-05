\timing

-- GET /products
SELECT * FROM product LIMIT 5;

-- GET /products/:product_id
SELECT json_build_object(
  'id', id,
  'name', name,
  'slogan', slogan,
  'description', description,
  'category', category,
  'default_price', default_price,
  'features', (SELECT json_agg(
    json_build_object(
      'feature', feature,
      'value', value
    )
  ) FROM features WHERE product_id=1)
) FROM product WHERE id=1;

-- GET /products/:product_id/styles
SELECT json_build_object(
  'product_id', 1,
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
  ) FROM styles WHERE product_id=1)
);

-- GET products/:product_id/related
SELECT json_agg(related_id) FROM related WHERE product_id=1;

\timing
