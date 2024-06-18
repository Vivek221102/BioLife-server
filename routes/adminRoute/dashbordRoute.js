const dashRouter = require('express').Router();
const con = require('../../config/db');


dashRouter.get("/api/getusersnums",(req,res)=>{
    
    const sel = "SELECT COUNT(user_id) as count from tbl_registration where status='Unblock'";
    con.query(sel,(err,result)=>{
        // console.log(result)
        res.send(result);
    })
})

dashRouter.get("/api/countcateg",(req,res)=>{
    
    const sel = "SELECT COUNT(id) as count from tbl_productcategory";
    con.query(sel,(err,result)=>{
        // console.log(result)
        res.send(result);
    })
})
dashRouter.get("/api/countitem",(req,res)=>{
    
    const sel = "SELECT COUNT(p_id) as count from tbl_productdetail";
    con.query(sel,(err,result)=>{
        // console.log(result)
        res.send(result);
    })
})
dashRouter.get("/api/countorder",(req,res)=>{
    const sel = "SELECT COUNT(*) as count FROM ( SELECT DISTINCT book_id FROM orderitem_tbl ) AS distinct_orders";
    con.query(sel,(err,result)=>{
        // console.log(result)
        res.send(result);
    })
})

module.exports = dashRouter;