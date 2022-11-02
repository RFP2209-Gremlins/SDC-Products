const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/products');

const productSchema = new mongoose.Schema({
  id: {type: Number, unique: true},
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [{feature: String, value: String}]
});

const stylesSchema = new mongoose.Schema({
  product_id: {type: Number, unique: true},
  results: [
    {
      style_id: Number,
      name: String,
      original_price: String,
      sale_price: String,
      'default?': Boolean,
      photos: [{thumbnail_url: String, url: String}],
      skus: {sku_id: {quantity: Number, size: String}}
    },
  ]
});

const relatedProductsSchema = new mongoose.Schema({
  product_id: {type: Number, unique: true},
  results: [Number]
});
