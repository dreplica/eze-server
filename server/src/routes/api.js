import express from 'express'
import { getProducts, getAllProducts } from '../controllers/products'
import updateSpreadsheet from '../controllers/updateSpreadsheet'
import pagination from '../logic/pagination'

var router = express.Router();


router.get('/', pagination(), async (req, res) => {

	const { limit, startPoint } = req
	const filter = req.query

	const result = await getProducts(startPoint, limit, filter);

	if (!result.length) req.pagination.forward = {}

	if (result.error) {
		return res.status(404).json({ error: "request not found" })
	}
	return res.status(200).json({ ...req.pagination, result });
});


router.get('/update', async (req, res) => {
	try {
		await updateSpreadsheet()
		return res.status(200).json({ status: 'refreshed' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ status: "server error, contact admin" })
	}
});


router.get('/buy', pagination(), async (req, res) => {

	const { limit, startPoint } = req
	const filter = req.query

	const result = await getProducts(startPoint, limit, filter);

	if (!result.length) req.pagination.forward = {}

	if (result.error) {
		return res.status(404).json({ error: "request not found" })
	}
	return res.status(200).json({ ...req.pagination, result });
});


router.get('/sell', pagination(), async (req, res) => {

	const { limit, startPoint } = req
	const filter = req.query

	const result = await getProducts(startPoint, limit, filter);

	if (!result.length) req.pagination.forward = {}

	if (result.error) {
		return res.status(404).json({ error: "request not found" })
	}
	return res.status(200).json({ ...req.pagination, result });
});




export default router;
