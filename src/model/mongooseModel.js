const mongoose = require('mongoose')

const iphoneSchema = new mongoose.Schema({
    phone: String,
    spec: [{
        memory: String,
        price: Number,
        quantity:{type:Number,default:0}
    }]
})

export const  buyModel = mongoose.model('Buy',iphoneSchema)
export const sellModel = mongoose.model('Sell',iphoneSchema)