const auth = require('../../config');
const { buyModel, sellModel } = require('../model/mongooseModel');
const {sellProductsData,buyProductsData} = require('./getSpreadsheet');
const mongoose = require('mongoose');


const updateBuyModel = async() => {
    try {
        const data = await buyProductsData(await auth)
        buyModel.find(async (err, res) => {
            if (err) updateHandler(data,buyModel)
            else {
                await mongoose.connection.db.dropCollection('buys', (res) => {
                    console.log("checking ", res)
                    updateHandler(data,buyModel)
                })
            }
        })
    
    } catch (error) {
        
    }
}

const updateSellModel =  async() => {
    try {
        const data = await sellProductsData(await auth)
        buyModel.find(async (err, res) => {
            if (err) updateHandler(data,sellModel)
            else {
                await mongoose.connection.db.dropCollection('sells', (res) => {
                    console.log("checking ", res)
                    updateHandler(data,sellModel)
                })
            }
        })
    
    } catch (error) {
        
    }
}

const updateHandler = async (data, model) => {
    await  data.forEach((item) => { 
                    const newModel = new model(item)
                    newModel.save()
            })
}

module.exports = {
    updateBuyModel,
    updateSellModel
}
