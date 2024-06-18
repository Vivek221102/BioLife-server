const cartRouter = require('express').Router();
const con = require('../../config/db');

cartRouter.post("/api/addcart",(req,res)=>{
    var uid=req.body.uid;
    var pdtid=req.body.p_id;
    // console.log(uid);

    const sel = "select * from  tbl_addtocart where user_id=? and product_id=?"
    con.query(sel,[uid, pdtid],(err,result)=>{
        
        if(result.length > 0){
          res.send({msg:"alrady in cart"})
        //   console.log(result);
                }
           
        else{
            const ins = "insert into tbl_addtocart (user_id,product_id) values(?,?)"
            con.query(ins,[uid,pdtid],(err,result)=>{
                if(result){
           
                    res.send(result);
                }
                else{
                    res.send({
                        msg:"something wrong"
                    })
        }
    })

}})

})


cartRouter.get("/api/fetchcart",(req,res)=>{
    var uid=req.query.uid;
    // var pid=req.query.p_id;
   
    const sel = "select a.*, b.* from tbl_addtocart as b,tbl_productdetail as a where a.p_id = b.product_id and b.user_id=?";
    con.query(sel,[uid],(err, result)=>{
// console.log(result);
        res.send(result);
    })
})

cartRouter.post("/api/updatequantity",(req,res)=>{
    const { uid,cid, quantity } = req.body;

  const upd="update tbl_addtocart SET quantity=?  where user_id=?  AND cart_id=? "  
   con.query(upd,[quantity,uid,cid],(err,result)=>{
        res.send(result);
    })
})

cartRouter.get("/api/getquantity",(req,res)=>{
    const cid =req.query.cid;
    const qty=req.query.qty;
    // console.log(qty);

    const sel="select * from tbl_addtocart where cart_id=? and quantity=?" ;
    con.query(sel,[cid,qty],(err,result)=>{
        res.send(result);
    })
    
})
   
cartRouter.get("/api/getcount",(req,res)=>{
    let uid = req.query.uid;
    //  console.log(uid);
 const sel= "SELECT COUNT(user_id) as count from tbl_addtocart where     user_id=? ";
con.query(sel,[uid],(err,result)=>{
    // console.log(result)
    res.send(result);  
})
})

cartRouter.post("/api/deleteproduct",(req,res)=>{
    const uid=req.body.uid;
    const pid=req.body.pid

    // console.log(pid);

    const del="delete from tbl_addtocart where user_id=? and product_id=?";
    con.query(del,[uid,pid],(err,result)=>{
        res.send(result);
    })
})
module.exports = cartRouter;
