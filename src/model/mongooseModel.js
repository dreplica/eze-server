import mongoose from 'mongoose'

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

export const buyModel = mongoose.model('Buy', iphoneSchema);
export const sellModel = mongoose.model('Sell', iphoneSchema);

// module.exports = {
// 	buyModel,
// 	sellModel
// };
