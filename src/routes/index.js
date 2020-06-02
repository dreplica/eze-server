
const express = require('express');
const { fetchSpreashSheet, getBuyProduts, getSellProducts, searchProducts } = require('../controllers/products');
const {google,buyProducts } = require('../../config');

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  //here would fetch phones on a random
  if (request.query['code']) {
    const code = request.query['code']
    updateToken(code)
  }
  
  const data = buyProducts(google.auth.OAuth2)
  console.log(data)
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
