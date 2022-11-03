const models = require('../models');

const getProducts = (req, res) => {
  models.products(req.query.page, req.query.count, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};

module.exports = getProducts;
