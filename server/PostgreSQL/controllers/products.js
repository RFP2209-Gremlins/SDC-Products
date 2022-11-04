const models = require('../models');

const getProducts = (req, res) => {
  models.products(req.query.page, req.query.count)
    .then(data => res.status(200).send(data.rows))
    .catch(err => res.status(500).send(err));
};

module.exports = getProducts;
