const mongoose = require('mongoose');
const auth = require('../../config');
// const { buyModel, sellModel } = require('../model/mongooseModel');
const { setProductsData } = require('./getSpreadsheet');

const updateHandler = async (data, model) => {
	// await data.forEach((item) => {
	// console.table(item.spec.map(x=>x.price))
	try {
		model.insertMany(data);
	} catch (error) {
		return error;
	}
	// newModel.save();
	// })
};

const updateModel = async (obj) => {
	try {
		const data = await setProductsData(await auth,obj.Xpath);
		obj.model.find(async (err, res) => {
			if (err) updateHandler(data, obj.model);
			else {
				await mongoose.connection.db.dropCollection(obj.purpose, (res) => {
					console.log('checking ', res);
					updateHandler(data, obj.model);
				});
			}
		});
	} catch (error) {
		console.log(error);
	}
};

// const updateSellModel = async () => {
// 	try {
// 		const data = await sellProductsData(await auth);
// 		buyModel.find(async (err, res) => {
// 			if (err) updateHandler(data, sellModel);
// 			else {
// 				await mongoose.connection.db.dropCollection('sells', (res) => {
// 					console.log('checking ', res);
// 					updateHandler(data, sellModel);
// 				});
// 			}
// 		});
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

module.exports = {
	updateModel,
};
