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

const phoneModel = mongoose.model('phone', iphoneSchema);

export default phoneModel
// export const sellModel = mongoose.model('Sell', iphoneSchema);
