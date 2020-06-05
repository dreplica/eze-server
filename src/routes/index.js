const express = require('express');
const { getProducts, searchProducts } = require('../controllers/products');
const { updateToken } = require('../controllers/apiAuth');
const { updateModel, updateBuyModel } = require('../logic/updateSpreadsheet');
const { sellModel, buyModel } = require('../model/mongooseModel');
const pagination = require('../logic/pagination');

const router = express.Router();

const buyModelLength = async () => await buyModel.estimatedDocumentCount()
const sellModelLength = async () => await sellModel.estimatedDocumentCount()
/* GET home page. */
router.get('/', async (req, res) => {
	//here would fetch phones on a random
	console.log("this is that length", await buyModelLength())
	if (req.query['code']) {
		const code = req.query['code'];
		console.log('coding code', code);
		await updateToken(code);
		return res.status(200).send('configured');
	}
});

router.get('/update', async (req, res) => {
	const buyPath = { Xpath: 'IPHONES!A3:J', purpose: 'buys', model: buyModel }
	const sellPath = { Xpath: 'IPHONES!L3:U', purpose: 'sells', model: sellModel }
	try {
		await updateModel(buyPath);
		await updateModel(sellPath);
		return res.status(200).json({ status: 'refreshed' });
	} catch (error) {
		console.log(error);
	}
});

router.get('/buy', pagination(buyModelLength()), async (req, res) => {
	const product = await getProducts(buyModel, req.startPoint, req.limit);
	if (product.error) {
		return res.status(404).json({ error: "request not found" })
	}
	return res.status(200).json({ ...req.pagination, product });
});

router.get('/sell', pagination(sellModelLength()), async (req, res) => {
	const product = await getProducts(sellModel, req.startPoint, req.limit);
	if (product.error) {
		return res.status(404).json({ error: "request not found" })
	}
	return res.status(200).json({ ...req.pagination, product });
});



router.post('/search', async (req, res) => {
	const parameters = req.body['search'];
	const search = await searchProducts(parameters);
	console.log;
	return res.status(200).json(search);
});

module.exports = router;
