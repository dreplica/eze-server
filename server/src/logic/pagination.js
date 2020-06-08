
const pagination = (buyLength=0,sellLength=0) => async (req, res, next) => {
    if (!req.query.page) return next();

    const length = await buyLength + await sellLength
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startPoint = (page - 1) * limit;
    const endPoint = page * limit

    const previous = startPoint > 0 ? { page: page - 1, limit: limit ? limit : 5 } : {}
    const forward = endPoint < await length ? { page: page + 1, limit: limit ? limit : 5 } : {}

    req.startPoint = startPoint
    req.limit = limit
    req.pagination = { previous, forward }
    next()

}

export default pagination