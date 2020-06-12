import phoneModel from "../model/mongooseModel";

const pagination = () => async (req, res, next) => {

    let { sell, page, limit, size, condition, phone,max,min } = req.query

    page = !page ? 1 : parseInt(page)
    limit = !limit ? 10 : parseInt(limit)

    const length = await getPagingLength({ phone, sell, size, condition,max,min })

    const startPoint = (page - 1) * limit;
    const endPoint = page * limit

    const previous = startPoint > 0 ? { page: page - 1, limit: limit ? limit : 5 } : {}
    const forward = endPoint < length ? { page: page + 1, limit: limit ? limit : 5 } : {}

    req.startPoint = startPoint
    req.limit = limit

    req.pagination = { previous, forward }

    next()

}


const getPagingLength = async ({ phone = "iphone", sell = "", size = '', condition = "",max="",min="" }) => {

    const highestSize = !size ? Infinity : size
    const lowSize = !size ? 0 : size
    const maxPrice = !max ? Infinity : max
    const minPrice = !min ? 0 : min

    return await phoneModel.find({
        memory: { $gte: lowSize, $lte: highestSize },
        price: { $gte: minPrice, $lte: maxPrice },
        sell: { $regex: sell, $options: "i" },
        phone: { $regex: phone, $options: "i" },
        condition: { $regex: condition, $options: "i" },

    }).countDocuments()
}

export default pagination