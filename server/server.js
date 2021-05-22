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

