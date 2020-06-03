// import { sellModel,buyModel } from "../model/mongooseModel";

const { buyModel, sellModel } = require("../model/mongooseModel")


// export const searchProducts = () => {

// }

const getBuyProduts = async () => {
    try {
        const page = 1
        const pagination = 10
        const buyProduct = await buyModel.find().skip().limit(10)
        console.log(buyProduct)
        return buyProduct

    } catch (error) {
        console.log(error)
    }
}

export const getSellProducts = async () => {
    try {
        const page = 1
        const pagination = 10
        const buyProduct = await sellModel.find().skip().limit(10)
        console.log(buyProduct)
        return buyProduct

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getBuyProduts
}