const auth = require('../../config');
const { buyModel, sellModel } = require('../model/mongooseModel');
const { sellProductsData, buyProductsData } = require('./getSpreadsheet');
const mongoose = require('mongoose');

const updateHandler = async (data, model) => {
	// await data.forEach((item) => {
	// console.table(item.spec.map(x=>x.price))
	model.insertMany(data);
	// newModel.save();
	// })
};

const updateBuyModel = async () => {
	try {
		const data = await buyProductsData(await auth);
		buyModel.find(async (err, res) => {
			if (err) updateHandler(data, buyModel);
			else {
				await mongoose.connection.db.dropCollection('buys', (res) => {
					console.log('checking ', res);
					updateHandler(data, buyModel);
				});
			}
		});
	} catch (error) {
		console.log(error);
	}
};

const updateSellModel = async () => {
	try {
		const data = await sellProductsData(await auth);
		buyModel.find(async (err, res) => {
			if (err) updateHandler(data, sellModel);
			else {
				await mongoose.connection.db.dropCollection('sells', (res) => {
					console.log('checking ', res);
					updateHandler(data, sellModel);
				});
			}
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	updateBuyModel,
	updateSellModel
};
