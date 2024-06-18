const reviewRouter = require('express').Router();
const con = require('../config/db');

reviewRouter.post("/api/insertreview",(req,res)=>{
    const pid = req.body.id;
    const uid = req.body.uid;
    const rate = req.body.star;
    const name = req.body.name;
    const mail = req.body.email;
    const review = req.body.review;

    // console.log(pid +' '+uid +" "+ rate + ' '+mail+' '+review);

    con.query("insert into tbl_review (pdt_id, user_id, user_name, mail_id, rating, review_msg) values (?, ?, ?, ? ,?, ?)", [pid,uid,name,mail,rate,review], (err,result)=>{
        // console.log(result);                     
        res.send(result);
    })
})
.get("/api/fatchreview",(req,res)=>{
    const uid=req.query.uid;
    const pid=req.query.id;
      // console.log("product"+pid+"\n"+uid); 
  
    con.query("SELECT * FROM tbl_review  WHERE pdt_id= ?",[pid],(err,result)=>{
          // console.log(result);
           res.send(result);
    
    })
  })

  reviewRouter.get("/api/faqfetch",(req,res)=>{
    const sel = "select * from tbl_review";

    con.query(sel,(err,result)=>{
       
        res.send(result);
    })
})  

reviewRouter.post("/api/sendresponse",(req,res)=>{
   
  const {uid, pid, respo} = req.body
  console.log(`${pid}, ${uid}  , ${respo}`);

  con.query("UPDATE tbl_review SET response = ? WHERE user_id = ? AND pdt_id = ? ",[respo, uid, pid],(err,result) =>{
      if (err) throw err ;
  console.log(result)
      res.send(result);
 
  });
});

module.exports = reviewRouter;