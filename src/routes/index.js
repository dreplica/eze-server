import express from 'express';
import { fetchSpreashSheet, getBuyProduts, getSellProducts, searchProducts } from '../controllers/products';

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  //here would fetch phones on a random
});

router.get('/fetch', (req,res) => {
   fetchSpreashSheet();
})

router.get('/buy', (req,res) => {
  const buy = getBuyProduts()
})

router.get('/sell', (req,res) => {
  const sell = getSellProducts();
})

router.post('/search', (req, res) => {
  const parameters = req.query
  const search  = searchProducts(parameters)
})

export default router
