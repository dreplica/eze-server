
const express = require('express');
const { getBuyProduts, getSellProducts, searchProducts } = require('../controllers/products');
const auth = require('../../config');
const { updateToken } = require('../controllers/apiAuth');
const {buyProductsData,sellProductsData} = require('../controllers/spreadsheetRead');

const router = express.Router();

/* GET home page. */
router.get('/',  async (req, res)=> {
  //here would fetch phones on a random
  if (req.query['code']) {
    const code = req.query['code']
    console.log("coding code",code)
    await updateToken(code)
    return res.status(200)
  }
  const oAuth = await auth
  const buydata = await buyProductsData(oAuth)
  const selldata = await sellProductsData(oAuth)
  console.log(buydata,selldata)
  return res.status(200).json({name:data});
});

router.get('/fetch', (req,res) => {
  // fetchSpreashSheet();
  console.log("hello")
  return res.status(200).json({});
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

module.exports =  router
