const models = require('../models');

const getStyles = (req, res) => {
  models.styles(req.params.product_id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
};

module.exports = getStyles;
