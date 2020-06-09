import mongoose from 'mongoose'

export const iphoneSchema = new mongoose.Schema({
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
