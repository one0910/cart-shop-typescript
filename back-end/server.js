const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const Products = require("./models/cart-shop");
dotenv.config({path:"./config.env"})

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
)

mongoose.connect(DB,{
    serverSelectionTimeoutMS: 1000
}).then(()=>{
    console.log('連線成功',)
}).catch((error)=>{
    console.log('error.message',error.message)
    console.log('error.reason',error.reason)
})

app.use(cors());
app.use(express.json());

app.get('/products', async(request,response)=>{
     try {
        const products =  await Products.find();
        console.log('products',products)
        response.json({
            "status":"scuccss",
            "result":products
        })
     } catch (error) {
        console.error(error.toString());
        response.status(500).json({ "error": error.toString() });
     }
})



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});