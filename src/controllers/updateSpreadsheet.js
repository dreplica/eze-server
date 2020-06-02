const auth = require('../../config');
const { buyModel, sellModel } = require('../model/mongooseModel');
const {sellProductsData,buyProductsData} = require('./getSpreadsheet')


const updateSellMOdel = async() => {
    try {
        buyModel.deleteMany({phone:{$regex:/iphone.+/,options:'i'}})
        const data = await sellProductsData(await auth)
        console.log("sell data",await data)
        const newModel = new sellModel(data)
        newModel.save
    } catch (error) {
        
    }
}

const updateBuyMOdel = async() => {
    try {
        buyModel.deleteMany({phone:{$regex:/iphone.+/,options:'i'}})
        const data = await buyProductsData(await auth)
        console.log("buy data",await data)
        const newModel = new buyModel(data)
        newModel.save
    } catch (error) {
        
    }
}

module.exports = {
    updateBuyMOdel,
    updateSellMOdel
}