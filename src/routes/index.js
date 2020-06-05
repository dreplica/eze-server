const express = require('express');
const { getProducts, searchProducts, getAllProducts } = require('../controllers/products');
const { updateToken } = require('../controllers/apiAuth');
const { updateModel, updateBuyModel } = require('../logic/updateSpreadsheet');
const { sellModel, buyModel } = require('../model/mongooseModel');
const pagination = require('../logic/pagination');

const router = express.Router();

const buyModelLength = async () => await buyModel.estimatedDocumentCount()
const sellModelLength = async () => await sellModel.estimatedDocumentCount()

/* GET home page. */
router.get('/', pagination(buyModelLength(),sellModelLength()), async (req, res) => {
	try {
		if (req.query['code']) {
			const code = req.query['code'];
			console.log('coding code', code);
			await updateToken(code);
			return res.status(200).send('configured');
		}
		const result = await getAllProducts(req.startPoint, req.limit, req.query.filter)

		if (result.error) return res.status(404).json({ error: "not found" })
		if (!result.length) req.pagination.forward = {}
		
		return res.status(200).json({ ...req.pagination, result })
	} catch (error) {
		return res.status(404).json({ error: "request not found" })
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
		return res.status(500).json({ status: "server error, contact admin" })
	}
});

router.get('/buy', pagination(buyModelLength()), async (req, res) => {
	const product = await getProducts(buyModel, req.startPoint, req.limit, req.query.filter);
	if (!product.length) req.pagination.forward = {}

	if (product.error) {
		return res.status(404).json({ error: "request not found" })
	}
	return res.status(200).json({ ...req.pagination, product });
});

router.get('/sell', pagination(sellModelLength()), async (req, res) => {
	const product = await getProducts(sellModel, req.startPoint, req.limit, req.query.filter);
	if (!product.length) req.pagination.forward = {}

	if (product.error) {
		return res.status(404).json({ error: "request not found" })
	}
	return res.status(200).json({ ...req.pagination, product });
});



router.post('/search', async (req, res) => {
	const {filter,limit,page} = req.body;
	const search = await searchProducts(filter);
	console.log;
	return res.status(200).json(search);
});

module.exports = router;
