const { response } = require('express');
const con = require('../../config/db');

const adminOrdRouter = require('express').Router();


adminOrdRouter.get("/api/fetchorderdetails",(req,res)=>{
    const bookid =  req.query.id;
    
    con.query("select * from orderitem_tbl where book_id=?",[bookid],(err,result) =>{
       res.json(result);
    });
});
adminOrdRouter.post("/api/rejectoid",(req,res)=>{
   
    const bid =req.body.bid;
    console.log(bid);
     con.query(" UPDATE orderitem_tbl SET status='Reject' WHERE book_id =? ",[bid],(err,result) =>{
         if (err) throw err ;
     // console.log(result)
         res.send(result);
    
     });    
})

adminOrdRouter.post("/api/approveoid",(req,res)=>{
    const bid =req.body.bid;
    console.log(bid);
     con.query(" UPDATE orderitem_tbl SET status='Approve' WHERE book_id =? ",[bid],(err,result) =>{
         if (err) throw err ;    
     // console.log(result)
         res.send(result);   
    
     });
 })

 adminOrdRouter.get("/api/acceptedord",(req,res)=>{
   
    con.query("select * from orderitem_tbl where status='Approve' ",(err,result) =>{
        if (err) throw err ;
   // console.log(result)
        res.send(result);
   
    });
});
 
adminOrdRouter.get("/api/rejectord",(req,res)=>{
   
    con.query("select * from orderitem_tbl where status='Reject' ",(err,result) =>{
        if (err) throw err ;
   // console.log(result)
        res.send(result);
   
    });
});


module.exports = adminOrdRouter