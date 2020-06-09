import  express  from 'express'
import  { updateToken }  from '../controllers/apiAuth'

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		if (req.query['code']) {
			const code = req.query['code'];
			console.log('code auth', code);
			await updateToken(code);
			return res.status(200).send('configured');
		}
		return res.status(200).send('welcome to Ezewholesale');

	} catch (error) {
		return res.status(404).json({ error: "request not found" })
	}
});

export default router;
