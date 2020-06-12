import phoneModel from '../model/mongooseModel'

// exp
const getProducts = async (start = 0, limit = 10, { phone='iphone',sell = "", min = "",max="", size = "", condition = "" }) => {
	try {
		const high = !size ? Infinity : size
		const low = !size ? 0 : size
		const maxPrice = !max ? Infinity : max
		const minPrice = !min ? 0 : min

		const Product = await phoneModel.find(
			{
				memory: { $gte: low, $lte: high },
				price: { $gte: minPrice, $lte: maxPrice },
				$and: [
					
					{sell:  {$regex: sell, $options: "i"} },
					{phone: {$regex: phone, $options: "i"} },
					{ condition: { $regex: condition, $options: "i" } },
				]
			})
			.sort({ price:'-1' })
			.skip(start)
			.limit(limit)


		return Product;
	} catch (error) {
		console.log(error);
		return { error }
	}
};


export default getProducts