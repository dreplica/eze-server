const mongoose = require('mongoose');

const iphoneSchema = new mongoose.Schema({
	phone: String,
	spec: [
		{
			_id: false,
			locked: Boolean,
			memory: String,
			price: [
				{
					NEW: String,
					_id: false,
					A1: String,
					A2: String,
					B1: String,
					B2: String,
					C: String,
					'C/B': String,
					'C/D': String
				}
			]
		}
	]
});

const buyModel = mongoose.model('Buy', iphoneSchema);
const sellModel = mongoose.model('Sell', iphoneSchema);

module.exports = {
	buyModel,
	sellModel
};
