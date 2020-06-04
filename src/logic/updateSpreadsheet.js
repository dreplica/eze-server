const mongoose = require('mongoose');
const auth = require('../../config');
const { setProductsData } = require('./getSpreadsheet');
const arrangeData = require('./arrangeData');

const updateHandler = async (data, model) => {
	try {
		model.insertMany(data);
	} catch (error) {
		return error;
	}
};

const updateModel = async (obj) => {
	try {
		const data = await setProductsData(await auth, obj.Xpath, obj.purpose);
		const result = arrangeData(data)
		obj.model.find(async (err, res) => {
			if (err) updateHandler(result, obj.model);
			else {
				await mongoose.connection.db.dropCollection(obj.purpose, (res) => {
					updateHandler(result, obj.model);
				});
			}
		});
	} catch (error) {
		console.log(error);
		return { error }
	}
};


module.exports = {
	updateModel,
};