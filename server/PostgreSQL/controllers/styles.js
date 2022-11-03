const models = require('../models');

const getStyles = (req, res) => {
  models.styles(req.params.product_id, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};

module.exports = getStyles;
