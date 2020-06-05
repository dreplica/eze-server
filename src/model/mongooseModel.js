const mongoose = require('mongoose');

const iphoneSchema = new mongoose.Schema({
	_id: false,
	condition: String,
	image: String,
	locked: String,
	memory: Number,
	phone: String,
	price: Number,
	sell: String
});

const buyModel = mongoose.model('Buy', iphoneSchema);
const sellModel = mongoose.model('Sell', iphoneSchema);

module.exports = {
	buyModel,
	sellModel
};
