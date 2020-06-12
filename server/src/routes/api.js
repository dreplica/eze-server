import express from 'express'
import getProducts from '../controllers/products'
import updateSpreadsheet from '../controllers/updateSpreadsheet'
import pagination from '../logic/pagination'

const router = express.Router();

router.get('/', pagination(), async (req, res) => {

	try {
		const { limit, startPoint } = req
		const filter = req.query
	
		const result = await getProducts(startPoint, limit, filter);

		if (!result.length) req.pagination.forward = {}
		if (result.error) {
			return res.status(404).json({ error: "request not found" })
		}

		return res.status(200).json({ ...req.pagination, result });
	} catch (error) {
		return res.status(404).json({ error: "request not found" })
	}
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


// router.get('/buy', pagination(), async (req, res) => {
// 	try {
// 		const { limit, startPoint } = req
// 		const filter = req.query
// 		const result = await getProducts(startPoint, limit, filter);

// 		if (!result.length) req.pagination.forward = {}
// 		if (result.error) {
// 			return res.status(404).json({ error: "request not found" })
// 		}

// 		return res.status(200).json({ ...req.pagination, result });
// 	} catch (error) {
// 		return res.status(404).json({ error: "request not found" })
// 	}
// });


// router.get('/sell', pagination(), async (req, res) => {
// 	try {
// 		const { limit, startPoint } = req
// 		const filter = req.query
// 		const result = await getProducts(startPoint, limit, filter);

// 		if (!result.length) req.pagination.forward = {}
// 		if (result.error) {
// 			return res.status(404).json({ error: "request not found" })
// 		}

// 		return res.status(200).json({ ...req.pagination, result });
// 	} catch (error) {
// 		return res.status(404).json({ error: "request not found" })
// 	}
// });


export default router;
