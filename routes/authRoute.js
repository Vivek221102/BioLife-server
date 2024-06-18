const authRouter = require('express').Router();
const con = require('../config/db');

var jwt = require("jsonwebtoken"); 

var Jwtkey = "vivek";

//admin
authRouter.post("/api/loginadmin",(req, res)=>{
    var email=req.body.email;
    var pass=req.body.password;
   
    const sel= "select * from tbl_admin_login where email=? and pass=? ";
    con.query(sel,[email, pass],(err,result)=>{
      
        if(result.length > 0){
            res.send(result);
  
        }else{
            res.send({msg:"wrong id password"});
        }
        
    });
})

//user
authRouter.post("/api/loggingin",(req, res)=>{

    var email=req.body.mail;
    var password=req.body.pass;

    const sel= "select * from tbl_registration where mail_id=? and pass=? ";
    con.query(sel,[email, password],(err,result)=>{
      
        if(result.length > 0){
            jwt.sign({result},Jwtkey,{expiresIn:"2h"},(err,token)=>{
            console.log("Token is : ", token);
                if(!err){
                    ({result, auth:token}); 
                    const token1=token;
                    res.send({result,token1});
                }
                res.send({result:"something went wrong please try again"})
            })  
            
        }else{
            res.send({msg:"wrong id password"});
        }
        
    });
})

module.exports =authRouter; 