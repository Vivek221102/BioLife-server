const orderRouter = require('express').Router();
const con = require('../../config/db');


orderRouter.post("/api/insertorder", (req, res) => {
    let oid = Math.floor(100000 + Math.random() * 900000);
    let uid = req.body.uid;
    let rwd = req.body.rwd;
    console.log(rwd);
    let prc = req.body.prc;
    console.log(`Order ID: ${oid}, User ID: ${uid}, price: ${prc}`);

    const ins = "INSERT INTO orderitem_tbl (user_id, pdt_id, qty, book_id, prc, used_reward) SELECT a.user_id, a.product_id, a.quantity, ?, ?, ? FROM tbl_addtocart a LEFT JOIN orderitem_tbl b ON a.user_id = b.user_id AND a.product_id = b.pdt_id AND a.quantity = b.qty WHERE a.user_id = ? AND b.pdt_id IS NULL;"
    con.query(ins, [oid, prc, rwd, uid], (err, result) => {
        if (err) {
            console.log({ msg: "Error occurred", error: err }); // Log the error message
            res.status(500).json({ error: "An error occurred while inserting order" }); // Send appropriate response to the client
        } else {
            con.query("Delete From tbl_addtocart  WHERE user_id = ?", [uid], (err, result) => {
                if (rwd == 0) {
                    res.send(result);
                } else {
                    const udt = "UPDATE tbl_rewards SET total_amount = total_amount - ?, status = 'used' WHERE reward_id = (SELECT MIN(reward_id) FROM tbl_rewards WHERE user_id = ?)";
                    con.query(udt, [rwd, uid], (err, rst) => {
                        if (err) {
                            res.send({ msg: "error updating reward" });
                        } else {
                            console.log("Total amount updated:", rst.changedRows);
                            res.send({ msg: "order placed successfully" });
                        }
                    });
                }
            });
        }
    });
});


orderRouter.get("/api/fetchorder",(req,res)=>{
    let uid = req.query.uid;
  
    const sel = "SELECT DISTINCT book_id,when_oredered,prc FROM orderitem_tbl where user_id=?"
    con.query(sel,[uid],(err,result)=>{
        res.send(result);
})
})

orderRouter.get("/api/getdatainvoice",(req,res)=>{
    let uid =req.query.uid;
    let oid = req.query.oid;


    const grp = "select a.*, b.* from orderitem_tbl as b,tbl_productdetail as a where a.p_id = b.pdt_id and b.user_id=? and b.book_id = ?";
    con.query(grp,[uid, oid],(err,result)=>{
        // console.log(result)
        res.send(result);
  
    })
})

orderRouter.get("/api/orederdpdts",(req,res)=>{
    var uid =req.query.uid;
//    console.log(uid)
    const sel = "SELECT pd.*, oi.pdt_id, oi.when_oredered AS when_oredered FROM tbl_productdetail pd LEFT JOIN orderitem_tbl oi ON pd.p_id = oi.pdt_id AND oi.user_id =? ORDER BY CASE WHEN oi.when_oredered IS NULL THEN 1 ELSE 0 END, oi.when_oredered DESC, oi.pdt_id ASC;";
    con.query(sel,[uid],(err,result)=>{
        res.send(result);
        // console.log(result)
    })    
    })

module.exports = orderRouter;