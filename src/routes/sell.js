var express = require('express');
const { sellModel } = require('../model/mongooseModel');
var router = express.Router();

/* GET home page. */
router.get('/sell', function (req, res, next) {
    const sell = sellProducts()
    res.render('index', { title: 'Express' });
});

module.exports = router;
