const mongoose = require ("mongoose");

const productSchema=new mongoose.Schema({
    "_id":{type:String,required:true},
    "name":{type:String,required:true},
    "brand":{type:String,required:true},
    "price":{type:Number,required:true},
    "qty":{type:Number,required:true},
    "countInstock":{type:Number,required:true},
    "img":{type:String,required:true},
    "rating":{type:Number,required:true},
    "description":{type:String,required:true},
});
const Product=mongoose.model("Product",productSchema);
model.exports=Product;