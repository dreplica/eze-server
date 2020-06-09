import mongoose from 'mongoose'
import auth from '../../config'
import { setProductsData } from '../logic/getSpreadsheet'
import arrangeData from '../logic/arrangeData'
// import  model  from '../model/mongooseModel'

const entries = [
	{ Sheetpath: 'IPHONES!A3:J', purpose: 'buy' },
	{ Sheetpath: 'IPHONES!L3:U', purpose: 'sell' }
]

const updateHandler = async (data) => {
	try {
		model.insertMany(data);
	} catch (error) {
		return error;
	}
};

 const updateModel = async (path, model) => {
	 try {
		
		const data = await setProductsData(await auth, path.Sheetpath, path.purpose);
		const result = arrangeData(data)
		model.find(async (err, res) => {
			if (err) return updateHandler(result);

			mongoose.connection.db.dropCollection("phones", (res) => {
				updateHandler(result);
			});

		});
	} catch (error) {
		console.log(error);
		return { error }
	}
};


export default (model) => {
	entries.forEach((path) => {
		updateModel(path, model)
	})
}