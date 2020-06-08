import phoneModel from "../model/mongooseModel";

const pagination = () => async (req, res, next) => {
    if (!req.query.page) {
        req.pagination = { previous: {}, forward: {} }
        return next()
    };

    let { sell, page, limit, size, condition } = req.query

    page = parseInt(page)
    limit = parseInt(limit)

    const length = await getPagingLength({ sell, size, condition })

    console.log("making great numbers", length)

    const startPoint = (page - 1) * limit;
    const endPoint = page * limit

    const previous = startPoint > 0 ? { page: page - 1, limit: limit ? limit : 5 } : {}
    const forward = endPoint < length ? { page: page + 1, limit: limit ? limit : 5 } : {}

    req.startPoint = startPoint
    req.limit = limit

    req.pagination = { previous, forward }

    next()

}


const getPagingLength = async ({ sell = /\w/, size, condition = /\w/ }) => {

    const high = !size ? Infinity : size
    const low = !size ? 0 : size

    console.log("this is condition")

    return await phoneModel.countDocuments(
        {
            sell: { $regex: sell, $options: "i" },
            condition: { $regex: condition, $options: "i" },
            memory: { $gte: low, $lte: high }
        })
}

export default pagination