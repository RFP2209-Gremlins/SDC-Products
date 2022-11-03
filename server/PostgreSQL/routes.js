const controllers = require('./controllers');
const router = require('express').Router();

router.get('/products', controllers.products);

router.get('/products/:product_id', controllers.product);

router.get('/products/:product_id/styles', controllers.styles);

router.get('/products/:product_id/related', controllers.related);

module.exports = router;
