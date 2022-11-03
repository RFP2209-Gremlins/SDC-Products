const controller = require('./controllers');
const router = require('express').Router();

router.get('/products', controller.products);

module.exports = router;
