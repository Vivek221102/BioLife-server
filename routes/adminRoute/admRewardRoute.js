const admRewardRouter = require('express').Router();
const con = require('../../config/db');


admRewardRouter.post("/api/verifyuid",(req,res)=>{
    var email=req.body.email;
    const sel= "select * from tbl_registration where mail_id=?";
    con.query(sel,[email],(err,result)=>{
        if(result.length > 0){
                res.send(result);
        }
        else{
            res.send({msg:"wrong User"});
        }   
})
})

admRewardRouter.post("/api/addrewarddata",(req,res)=>{
    var uid=req.body.uid;
    var pid=req.body.pid;
    var oid=req.body.oid;
    var rprice=req.body.rprice;
    var qty=req.body.qty;
    var subrvd=req.body.subrvd;
     
    
    const ins = "insert into tbl_rewards(user_id, pdt_id, order_id, qty, return_price, total_amount) values (?,?,?,?,?,?)"
    con.query(ins,[uid,pid,oid,qty,rprice,subrvd]);
                  res.send();
  })

  admRewardRouter.get("/api/getrewarddata",(req,res)=>{
    var uid =req.query.uid;
    const sel = "select total_amount, SUM(total_amount) as reward from tbl_rewards where user_id=?";
    con.query(sel,[uid],(err,result)=>{
        //   console.log(result)
        res.send(result);
         
    })
})

admRewardRouter.get("/api/getlistreward",(req,res)=>{
    var uid =req.query.uid;
//    console.log(uid)
    const sel = "select a.*, b.* from tbl_rewards as b,tbl_productdetail as a where b.user_id=? and b.pdt_id = a.p_uni_code";
    con.query(sel,[uid],(err,result)=>{
        res.send(result);
        // console.log(result)
    })    
    })

module.exports = admRewardRouter