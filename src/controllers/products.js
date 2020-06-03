// import { sellModel,buyModel } from "../model/mongooseModel";

const { buyModel, sellModel } = require("../model/mongooseModel")


const searchProducts = async (params) => {
    try {
        return await searcherFunc(params)
    } catch (error) {
        console.log(error)
    }

}

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
    getBuyProduts,
    getSellProducts,
    searchProducts
}


const searcherFunc = async (arr) => {

    const singleGetter = async (val) => {
        const getBuy = await buyModel.find({
            $or: [
                { 'phone': { $regex: /val/i } },
                { 'spec.memory': { $regex: /val/i } },
                { 'spec.price': { $elemMatch: val } }
            ],
        })
        const getSell = await sellModel.find({
            $or: [
                { 'phone': { $regex: /val/i } },
                { 'spec.memory': { $regex: /val/i } },
                { 'spec.price': { $elemMatch: val } }
            ],
        })
        return [...getBuy,...getSell]
    }

    const doubleSearch = async (arr) => {
        const getBuy = await buyModel.find({phone:arr[0],'spec.price':{$elemMatch:arr[1]}})
        const getSell = await SellModel.find({phone:arr[0],'spec.price':{$elemMatch:arr[1]}})
        return [...getBuy,...getSell]
    }

    const fullSearch = async (arr) => {
        const getBuy = await buyModel.find({phone:arr[0],'spec.price':{$elemMatch:arr[1]},'spec.memory':arr[2]})
        const getSell = await SellModel.find({phone:arr[0],'spec.price':{$elemMatch:arr[1]},'spec.memory':arr[2]})
        return [...getBuy,...getSell]
    }

    switch (arr.length) {
        case 1:
            return await singleGetter(arr[0])
        case 2:
            return await doubleSearch(arr)
        case 3:
            return await fullSearch(arr)
        default:
            return ([])
    }
}