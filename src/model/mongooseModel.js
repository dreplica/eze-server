const mongoose = require('mongoose')

const iphoneSchema = new mongoose.Schema({
    phone: String,
    spec: [{
        memory: String,
        price: Number,
        quantity:Number,default:0
    }]
})

const buyModel = mongoose.model('Buy',iphoneSchema)
const sellModel = mongoose.model('Sell',iphoneSchema)