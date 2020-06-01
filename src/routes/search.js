var express = require('express');
const { sellModel,buyModel } = require('../model/mongooseModel');
var router = express.Router();

/* GET users listing. */
router.get('/sell', function (req, res, next) {
  const search = searchProducts()
  res.send('respond with a resource');
});

module.exports = router;
