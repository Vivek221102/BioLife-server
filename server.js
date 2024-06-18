
// import mysql from 'mysql';
var express= require("express");
var cors = require("cors");
var body_parser = require("body-parser");   
var multer = require("multer");
const path = require("path");
const { request } = require("http");
const nodemailer = require("nodemailer");

const con = require('./config/db');
const authroute = require('./routes/authRoute')
const itemroute = require('./routes/itemRoute');
const homeRoute = require('./routes/userRoute/home')
const profileroute = require('./routes/userRoute/profileroute')
const mainItemRoute = require('./routes/userRoute/mainPrdRoute');
const cartRoute = require('./routes/userRoute/cartRoute');
const wishlistRouter = require("./routes/userRoute/wishlistRoute");
const orderRouter = require("./routes/userRoute/orderRoute");
const filterRouter = require("./routes/userRoute/filterprodRoute");
const reviewRouter = require("./routes/reviewRoute");
const adminOrdRouter = require("./routes/adminRoute/admOrdRoute");
const admRewardRouter = require("./routes/adminRoute/admRewardRoute");
const dashRouter = require("./routes/adminRoute/dashbordRoute");
const fetchtblRouter = require("./routes/adminRoute/fetchtableRoute");
const delEdtRouter = require("./routes/adminRoute/delEditRoute");


require('dotenv').config({path:"./config/config.env"});





var app = express();
app.use(cors());
app.use(express.json());
// const port = 1121;
app.listen(process.env.PORT, ()=>{
    console.log(`Port: ${process.env.PORT}`);
});

app.use("/public", express.static("public"));


// https://biostore-server.cyclic.app/
// // multer for file save in public folder
// const storage = multer.diskStorage({
//     destination:path.join(__dirname,'./public/'),
//     filename: function(req, file, callback){
//         callback(null,Date.now() + '-' + path.extname(file.originalname))
//     }
// })



// Set up disk storage for Multer
const storage = multer.diskStorage({
    // Specify the destination directory where files will be saved
    destination: path.join(__dirname, './public/'),

    // Define the filename for the saved file
    filename: function(req, file, callback) {
        // Generate a unique filename using the current timestamp and the original file extension
        callback(null, Date.now() + '-' + path.extname(file.originalname));
    }
});



app.get("/",(req,res)=>{
    res.send("<h1>welcome to biolife server</h1>")
})

app.post("/api/registration",(req,res)=>{
    var first =req.body.first_name;
   
    var  last_name = req.body.last_name;
    var mobile = req.body.mobile;
    var mail = req.body.mail_id;
    var pass = req.body.password;
    var add = req.body.address;

    const ins = "insert into tbl_registration (first_name, last_name, mail_id, pass, mobile, address) values (?, ?, ?, ?, ?, ?)"
    con.query(ins,[first, last_name, mail, pass, mobile, add])
    res.send();
})

app.use(authroute);
app.use(itemroute);
app.use(homeRoute);
app.use(profileroute);
app.use(mainItemRoute);
app.use(cartRoute);
app.use(wishlistRouter)
app.use(orderRouter)
app.use(filterRouter)
app.use(reviewRouter);
app.use(adminOrdRouter);
app.use(admRewardRouter);
app.use(dashRouter)
app.use(fetchtblRouter)
app.use(delEdtRouter)