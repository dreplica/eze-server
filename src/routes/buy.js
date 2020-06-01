var express = require('express');
const { buyModel } = require('../model/mongooseModel');
var router = express.Router();

/* GET home page. */
router.get('/buy', function (req, res, next) {
    const buy = buyProducts()
    res.render('index', { title: 'Express' });
});

module.exports = router;
