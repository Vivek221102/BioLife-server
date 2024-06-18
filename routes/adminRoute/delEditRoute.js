const delEdtRouter = require('express').Router();
const con = require('../../config/db');

delEdtRouter.post("/api/deletecat",(req,res)=>{
   
    var id = req.body.id;
    // console.log(id);
    const del = "delete from tbl_productcategory where id= ?";
    con.query(del,[id]);
    res.send();
})

delEdtRouter.post("/api/dltfeedback",(req,res)=>{
    var id = req.body.id;
    // console.log(id);
    const del = "delete from contectus where id= ?";
    con.query(del,[id]);
    res.send();
})

delEdtRouter.post("/api/deleteuser",(req,res)=>{
    var id = req.body.id;
    // console.log(id);
    const del = "delete from tbl_registration where user_id= ?";
    con.query(del,[id]);
    res.send();
})

delEdtRouter.post("/api/deleteitem",(req,res)=>{
    var id = req.body.id;
    // console.log(id);
    const del = "delete from tbl_productdetail where p_id= ?";
    con.query(del,[id]);
    res.send();
})

delEdtRouter.post("/api/Editcatvalues",(req,res)=>{
    var id = req.body.id;
    var cat = req.body.cat;
    var desc = req.body.desc;
// console.log(id)
    const upd = "update tbl_productcategory set cat_name = ?, cat_desc = ? where id= ?";
    con.query(upd,[cat, desc, id],(err,result)=>{
            res.json(result);
    })
})

delEdtRouter.post("/api/editprods",(req,res)=>{

    var id= req.body.editId;
    var name = req.body.name;
    var image = req.body.img;
    var prc = req.body.prc;
    var des = req.body.desc;
    var retprc =req.body.retprc;

    const udt = "update tbl_productdetail set p_name= ?, p_img= ?, p_price= ?, p_ret_price= ?, p_desc= ? where p_id= ? ";
    con.query(udt,[name, image, prc, retprc, des, id],(err, result)=>{
        res.json(result);
    })
})

module.exports = delEdtRouter