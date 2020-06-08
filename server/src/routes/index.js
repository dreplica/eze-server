import  express  from 'express'
import  { getProducts, searchProducts, getAllProducts }  from '../controllers/products'
import  { updateToken }  from '../controllers/apiAuth'
import  updateSpreadsheet, { updateModel }  from '../controllers/updateSpreadsheet'
import  { sellModel, phoneModel }  from '../model/mongooseModel'
import  pagination  from '../logic/pagination'

const router = express.Router();

const buyModelLength = async () => await buyModel.estimatedDocumentCount()
const sellModelLength = async () => await sellModel.estimatedDocumentCount()

/* GET home page. */
router.get('/', pagination(buyModelLength(), sellModelLength()), async (req, res) => {
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
	try {
		updateSpreadsheet()
		return res.status(200).json({ status: 'refreshed' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ status: "server error, contact admin" })
	}
});

router.get('/buy', pagination(buyModelLength()), async (req, res) => {
	const result = await getProducts(buyModel, req.startPoint, req.limit, req.query.filter);
	if (!result.length) req.pagination.forward = {}

	if (result.error) {
		return res.status(404).json({ error: "request not found" })
	}
	return res.status(200).json({ ...req.pagination, result });
});

router.get('/sell', pagination(sellModelLength()), async (req, res) => {
	const result = await getProducts(sellModel, req.startPoint, req.limit, req.query.filter);
	if (!result.length) req.pagination.forward = {}

	if (result.error) {
		return res.status(404).json({ error: "request not found" })
	}
	return res.status(200).json({ ...req.pagination, result });
});



router.post('/search', pagination(buyModelLength(), sellModelLength()), async (req, res) => {
	const { search, filter } = req.body;
	console.log(search, "and", filter)
	
	const result = await searchProducts(search, req.startPoint, req.limit, filter);

	if (!result.length) req.pagination.forward = {}

	if (result.error) return res.status(404).json({ error: "search not found" })

	return res.status(200).json({...req.pagination ,result});
});

export default router;
