const models = require('../models');

const getRelated = (req, res) => {
  models.related(req.params.product_id, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};

module.exports = getRelated;
