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

export const phoneModel = mongoose.model('phone', iphoneSchema);
// export const sellModel = mongoose.model('Sell', iphoneSchema);


