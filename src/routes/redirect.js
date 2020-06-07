import express from 'express'

var router = express.Router();

/* GET home page. */
router.post('/', function (req, res) {
	console.log("uri entered")
	const url = req.body['url'];
	console.log(url)
	res.status(200);
});

module.exports = router;
