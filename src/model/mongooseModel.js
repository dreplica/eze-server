const mongoose = require('mongoose')

const iphoneSchema = new mongoose.Schema({
    phone: String,
    spec: [{
        locked:Boolean,
        memory: String,
        price: [String],
        
    }]
})

 const  buyModel = mongoose.model('Buy',iphoneSchema)
const sellModel = mongoose.model('Sell', iphoneSchema)
 
module.exports = {
    buyModel,
    sellModel
}