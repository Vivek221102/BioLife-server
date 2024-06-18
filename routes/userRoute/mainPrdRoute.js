const exp = require('express');
const mainItemRoute = exp.Router();
const con = require('../../config/db');

mainItemRoute.get("/api/fetchid",(req,res)=>{
    let param = req.query.id;
// console.log(param)
    const sel = "select * from tbl_productdetail where  p_category=?";

    con.query(sel,[param],(err, result)=>{
        // console.log(result)
        res.send(result);
    })
})

mainItemRoute.get("/api/singleprod",(req,res)=>{              
    let param = req.query.id;
 
  
    const sel = "select a.*, b.* from tbl_productcategory as b,tbl_productdetail as a where a.p_category = b.id and a.p_id=? "
    con.query(sel,[param],(err, result)=>{
        res.send(result);
    });
});

module.exports = mainItemRoute;