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
const User = require ("./model/userModel");
const data = require("./data")
const generateToken= require ("./generateToken")
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

app.get("/api/products/:id",express_async_handler(async(req,res)=>{
    const product = await Product.findOne({"_id":new mongodb.ObjectID(req.params.id)});
     if(product){
         res.status(200).send(product);
     }else{
         res.status(400).send({"message":"no product avilable"});
     }
 }));
 app.get("/api/user/seed",express_async_handler(async(req,res)=>{
     User.remove({});
     const createUsers = await User.insertMany(data.user);
     res.send({createUsers});
 }));

 app.post("/api/user/signin",express_async_handler(async(req,res)=>{
  const user=  await User.findOne({"email":req.body.email});
    if(user){
        if(bcryptjs.compareSync(req.body.password,user.password)){
            res.status(200).send({
                _id:user._id,
                email:user.email,
                isAdmin:user.isAdmin,
                image:user.image,
                token:generateToken(user)
                
            })
        }else{
            res.status(401).send({message:"Invalid Password"});
        }
    }else{
        res.status(401).send({message:"Invalid User Name/ Password"});
    }
 }))

//assign the port Number
let port = process.env.PORT || 8080;

app.listen(port,()=>{
    console.log("server started");
});





