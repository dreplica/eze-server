var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/fetch', function (req, res, next) {
    const fetch = fetchSpreadsheet();
    res.render('index', { title: 'Express' });
});

module.exports = router;
