function arrangeData(data) {
    // const { previous, next, result } = data;
    const result = data;

    const phone = result.reduce((acc, val) => {
        const phone = val.phone
        const image = val.image
        const sell = val.sale

        const distribution = getIndividualPhones(val.spec)
        const phoneDistro = distribution.map((item) => {
            item.phone = phone;
            item.image = image;
            item.sell = sell
            return item;
        })
        acc.push(...phoneDistro)
        return acc;
    }, [])

    return phone

}


const getIndividualPhones = (spec) => {
    return spec.reduce((acc, val) => {
        const memory = val.memory
        const locked = val.locked
        const priceKeys = Object.keys(val.price)
        const distribute = priceKeys.map((item) => ({
            "price": val.price[item],
            memory: memory,
            locked: locked,
            condition: item

        }))
        acc.push(...distribute)
        return acc;
    }, [])
}

module.exports = arrangeData