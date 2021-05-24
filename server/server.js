const express = require ("express");
const express_async_handler = require ("express-async-handler");
const cors = require ("cors");
const bodyparser = require ("body-parser");
const bcryptjs = require ("bcryptjs");
const mongodb = require ("mongodb");
const mongoose = require ("mongoose");
const jsonwebtoken = require ("jsonwebtoken");
const dotenv = require ("dotenv");
const Product = require ("./model/productModel");
const app=express();

app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

dotenv.config();

mongoose.connect("mongodb+srv://admin:admin@cluster0.non2w.mongodb.net/ecommerce?retryWrites=true&w=majority",{
 useNewUrlParser:true,
 useUnifiedTopology:true,
 useCreateIndex:true   
});

//informe exception to user
//handel the server site error
app.use((err,req,res,next)=>{
    res.status(500).send({"err":err.message})
});

//create the get request
app.get("/api/products",express_async_handler(async(req,res)=>{
    const products = await Product.find();
    res.send(products);
}));

//assign the port Number
let port = process.env.PORT || 8080;

app.listen(port,()=>{
    console.log("server started");
});

