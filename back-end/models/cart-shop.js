const mongoose = require('mongoose')
const cartshopSchema = new mongoose.Schema(
    {
        id:String,
        img:String,
        price:Number,
        title:String,
        createdAt:{
            type:Date,
            default:Date.now,
            select:false
        }
    },
    {
        versionKey:false, /*每新增一筆document時，mongoose會自動幫你帶一筆名稱為_v的屬性，它的值是一個數字，通常拿來當版號，預設是開的，我把它關掉*/
        collection:"cart-shop",/* 強制設定collectionh的名稱，不會自動變小寫，也不會主動在字尾加上s */
        // timestamps:true,
    },
)


const Cartshop = mongoose.model('cart-shop',cartshopSchema)
module.exports = Cartshop