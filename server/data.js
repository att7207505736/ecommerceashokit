const bcrypt=require ("bcryptjs");

const data={
    "user":[
    {
        name:"AKhan",
        password:bcrypt.hashSync("admin",8),
        isAdmin:true,
        email:"akhan@gmail.com",
        image:"https://ecommerce-attaullah.s3.ap-south-1.amazonaws.com/Attaullah+Khan.jpg"
    },
    {
        name:"Khan",
        password:bcrypt.hashSync("admin",8),
        isAdmin:false,
        email:"khan@gmail.com",
        image:"https://ecommerce-attaullah.s3.ap-south-1.amazonaws.com/Attaullah+Khan.jpg"

    }
    ]
}
module.exports=data;