
const express = require('express');
const { getBuyProduts, getSellProducts, searchProducts } = require('../controllers/products');
const { updateToken } = require('../controllers/apiAuth');
const { updateSellModel,updateBuyModel } = require('../controllers/updateSpreadsheet');

const router = express.Router();

/* GET home page. */
router.get('/',  async (req, res)=> {
  //here would fetch phones on a random
  if (req.query['code']) {
    const code = req.query['code']
    console.log("coding code",code)
    await updateToken(code)
    return res.status(200).send("configured")
  }
});

router.get('/update', async (req, res) => {
  await updateBuyModel()
  await updateSellModel()
  return res.status(200).json({status:"refreshed"});
  
})

router.get('/buy', async (req,res) => {
  const buy = await getBuyProduts()
  return res.status(200).json(buy)
})

router.get('/sell', async (req,res) => {
  const sell = await getSellProducts();
  return res.status(200).json(sell)

})

router.post('/search', async(req, res) => {
  const parameters = req.body['search']
  const search = await searchProducts(parameters)
  console.log
  return res.status(200).json(search)
  
})

module.exports =  router
