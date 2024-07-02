
// import mysql from 'mysql';
var express= require("express");
var cors = require("cors");
var body_parser = require("body-parser");   
var multer = require("multer");
const path = require("path");
const { request } = require("http");

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



/////// in admin panel using post method add product detail on server to database. /////////
itemroute.post("/api/itemdetails",(req, resp)=>{
    let upload = multer({storage:storage}).single('p_image');
    upload (req,resp,function(err){
        console.log(err);
        if(!req.file){
            console.log("Not found");
        }

        else{
             var i_name = req.body.i_name;
            var i_code = Math.floor(100000 + Math.random() * 900000);
            var i_category = req.body.i_category;
            var i_price = req.body.i_price;
            var ret_price = req.body.ret_price;
            var i_des =req.body.i_des; 
            var p_image=req.file.filename;

            // console.log(i_name)
            // console.log(p_image)
            const ins="Insert into tbl_productdetail(p_name, p_uni_code, p_category, p_img, p_price, p_ret_price, p_desc) values (?, ?, ?, ?, ?, ?, ?)";
            con.query(ins,[i_name, i_code, i_category, p_image, i_price, ret_price, i_des]);
            resp.json();
        }
    })
});



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