const express = require('express');
const { getBuyProduts, getSellProducts, searchProducts } = require('../controllers/products');
const { updateToken } = require('../controllers/apiAuth');
const { updateModel, updateBuyModel } = require('../controllers/updateSpreadsheet');
const { sellModel, buyModel } = require('../model/mongooseModel');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
	//here would fetch phones on a random
	if (req.query['code']) {
		const code = req.query['code'];
		console.log('coding code', code);
		await updateToken(code);
		return res.status(200).send('configured');
	}
});

router.get('/update', async (req, res) => {
	const buyPath = { Xpath: 'IPHONES!A3:J', purpose: 'buys',model:buyModel }
	const sellPath = { Xpath: 'IPHONES!L3:U', purpose: 'sells',model:sellModel }
	try {
		await updateModel(buyPath);
		await updateModel(sellPath);
		return res.status(200).json({ status: 'refreshed' });
	} catch (error) {
		console.log(error);
	}
});

router.get('/buy', async (req, res) => {
	const buy = await getBuyProduts();
	return res.status(200).json(buy);
});

router.get('/sell', async (req, res) => {
	const sell = await getSellProducts();
	return res.status(200).json(sell);
});

router.post('/search', async (req, res) => {
	const parameters = req.body['search'];
	const search = await searchProducts(parameters);
	console.log;
	return res.status(200).json(search);
});

module.exports = router;
