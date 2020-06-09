import phoneModel from '../model/mongooseModel'

// exp
const getProducts = async (start = 0, limit = 10, { phone='iphone',sell = /\w/, sort = "-1", size = "", condition = "" }) => {
	try {
		const high = !size ? Infinity : size
		const low = !size ? 0 : size

		const Product = await phoneModel.find(
			{
				memory: { $gte: low, $lte: high },
				$and: [
					
					{sell:  {$regex: sell, $options: "i"} },
					{phone: {$regex: phone, $options: "i"} },
					{ condition: { $regex: condition, $options: "i" } },
				]
			})
			.sort({ price: sort })
			.skip(start)
			.limit(limit)


		return Product;
	} catch (error) {
		console.log(error);
		return { error }
	}
};


export default getProducts