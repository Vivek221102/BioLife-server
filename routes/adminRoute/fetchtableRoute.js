const fetchtblRouter = require('express').Router();
const con = require('../../config/db');

fetchtblRouter.post("/api/addcategory",(req, res)=>{
    var p_cat= req.body.c_name;
   
    var cat_des=req.body.cat_des;

    const ins = "insert into tbl_productcategory(cat_name, cat_desc) values (?,?)"
    con.query(ins,[p_cat, cat_des]);
    res.send();
})

fetchtblRouter.get("/api/userfetch",(req,res)=>{
    const sel = "select * from tbl_registration";
    
    con.query(sel,(err,result)=>{
      
        res.send(result);
    })
})


fetchtblRouter.get("/api/itemfetch",(req,res)=>{
    const sel = "select * from tbl_productdetail";

    con.query(sel,(err,result)=>{

        res.send(result);
    })
})

fetchtblRouter.get("/api/catfetch",(req,res)=>{
    const sel = "select * from tbl_productcategory";

    con.query(sel,(err,result)=>{
     
        res.send(result);
    })
})


fetchtblRouter.get("/api/fetchordervals",(req,res)=>{
    const sel = "SELECT DISTINCT book_id,when_oredered FROM orderitem_tbl";
    con.query(sel,(err,result)=>{
        // console.log(result)
        res.send(result);
    })
})

fetchtblRouter.post("/api/contact",(req, res)=>{
    var name= req.body.name;
   
    var email=req.body.email;
  
    var phone=req.body.phone;
  
    var mes=req.body.mes;


    const ins = "insert into contectus(user_name,email_id,ph_no,msg) values (?,?,?,?)"
    con.query(ins,[name, email, phone, mes]);
    res.send();
})
module.exports = fetchtblRouter