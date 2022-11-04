const models = require('../models');

const getRelated = (req, res) => {
  models.related(req.params.product_id)
    .then(data => res.status(200).send(data.rows[0].json_agg))
    .catch(err => res.status(500).send(err));
};

module.exports = getRelated;
