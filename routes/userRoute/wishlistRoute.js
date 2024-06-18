const wishlistRouter = require('express').Router();
const con = require('../../config/db');

wishlistRouter.get("/api/wishlistfetch",(req,res)=>{
    const uid=req.query.uid;
    // console.log(uid)
    const sel = "select a.* , b.*  from tbl_wishlist as b, tbl_productdetail as a where a.p_id = b.pdt_id and b.user_id=?"
    con.query(sel,[uid],(err,result)=>{
        res.send(result);
    })
})

wishlistRouter.post("/api/removeitemwish",(req,res)=>{
    let uid=req.body.uid;
    let pid=req.body.pid;
    console.log(uid);
    console.log(pid);
    const del="delete from tbl_wishlist where pdt_id=? and user_id=?";
    con.query(del,[pid,uid],(err,result)=>{
        res.send(result)
    })
})

wishlistRouter.post("/api/addwish",(req,res)=>{
    let uid=req.body.uid;
    let pid=req.body.p_id;
    // console.log(pid)
    const sel = "select * from tbl_wishlist where pdt_id=? and user_id=?"
    con.query(sel,[pid,uid],(err,result)=>{
        if(result.length > 0){
            res.send({msg:"product is alrady in your wishlist "})
                  }
             
          else{
              const ins = "insert into tbl_wishlist (user_id,pdt_id) values(?,?)"
              con.query(ins,[uid,pid],(err,result)=>{
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

wishlistRouter

module.exports = wishlistRouter;
