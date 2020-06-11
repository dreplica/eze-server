import phoneModel from "../model/mongooseModel";

const pagination = () => async (req, res, next) => {

    let { sell, page, limit, size, condition, phone } = req.query

    page = !page ? 1 : parseInt(page)
    limit = !limit ? 10 : parseInt(limit)

    const length = await getPagingLength({ phone, sell, size, condition })

    console.log("this is lenghtt after checking", length)

    const startPoint = (page - 1) * limit;
    const endPoint = page * limit

    const previous = startPoint > 0 ? { page: page - 1, limit: limit ? limit : 5 } : {}
    const forward = endPoint < length ? { page: page + 1, limit: limit ? limit : 5 } : {}

    req.startPoint = startPoint
    req.limit = limit

    req.pagination = { previous, forward }

    next()

}


const getPagingLength = async ({ phone = "iphone", sell = "", size = '', condition = "" }) => {

    const high = !size ? Infinity : size
    const low = !size ? 0 : size

    return await phoneModel.find({
        memory: { $gte: low, $lte: high },
        sell: { $regex: sell, $options: "i" },
        phone: { $regex: phone, $options: "i" },
        condition: { $regex: condition, $options: "i" },

    }).countDocuments()
}

export default pagination