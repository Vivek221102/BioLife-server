const itemroute = require('express').Router();
const con = require('../config/db')


/////// in admin panel using post method add product detail on server to database. /////////
itemroute.post("/api/itemdetails",(req, resp)=>{
    let upload = multer({storage:storage}).single('p_image');
    upload (req,resp,function(err){
        console.log(err);
        if(!req.file){
            console.log("Not found");
        }

        else{
             var i_name = req.body.i_name;
            var i_code = Math.floor(100000 + Math.random() * 900000);
            var i_category = req.body.i_category;
            var i_price = req.body.i_price;
            var ret_price = req.body.ret_price;
            var i_des =req.body.i_des; 
            var p_image=req.file.filename;

            // console.log(i_name)
            // console.log(p_image)
            const ins="Insert into tbl_productdetail(p_name, p_uni_code, p_category, p_img, p_price, p_ret_price, p_desc) values (?, ?, ?, ?, ?, ?, ?)";
            con.query(ins,[i_name, i_code, i_category, p_image, i_price, ret_price, i_des]);
            resp.json();
        }
    })
});

//display item user 
itemroute.get("/api/productlist", (req, res) => {
    const sel = "SELECT * FROM tbl_productdetail";
    con.query(sel, (err, result) => {
        if (err) {
            console.error("Error fetching product list:", err);
            res.status(500).json({ error: "Error fetching product list" });
        } else {
            res.json(result);
        }
    });
});

//category
itemroute.get("/api/productcat",(req,res)=>{
    const sel = "select * from tbl_productcategory";

    con.query(sel,(err, result)=>{
      
        res.send(result);
    })
})

//admin
itemroute.get("api/fetchprod",(req,res)=>{
    var pid=req.query.p_id;
    
   const sel="select * from tbl_productdetail where p_id=? "
   con.query(sel,[pid],(err,result)=>{
    res.send();

   })
})



itemroute.get("/api/getdetails",(req,res)=>{
    let pid = req.query.pid;
    let uid = req.query.uid;
    let pdtid = req.query.prid;
    // console.log(pid);

    const sel = "SELECT a.p_name,a.p_ret_price,a.p_price,a.p_id,b.* from tbl_productdetail as a,orderitem_tbl as b where a.p_uni_code=? and b.user_id=? and b.pdt_id=a.p_id";
    con.query(sel,[pid,uid],(err,result)=>{
            res.send(result);  
})  
})

itemroute.post("/api/addpdtqty",(req,res)=>{
    var pid = req.body.pid;
    var uid = req.body.uid;
    var qtys = req.body.qtys;
    // console.log(qtys);
    const ins = "Insert into tbl_rewards (user_id, pdt_id, qty) values (?,?,?)";
    con.query(ins,[uid, pid, qtys],(err,result)=>{
    //    console.log(result);
        res.send(result);
    })
})

itemroute.get("api/fetchprod",(req,res)=>{
    var pid=req.query.p_id;
    
   const sel="select * from tbl_productdetail where p_id=? "
   con.query(sel,[pid],(err,result)=>{
    res.send();

   })
})
module.exports= itemroute;