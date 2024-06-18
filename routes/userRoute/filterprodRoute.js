const filterRouter = require('express').Router();
const con = require('../../config/db');


filterRouter.get('/api/productsearch', (req, res) => {
    const searchTerm = req.query.searchTerm;
    // console.log(searchTerm)
    const query = `SELECT * FROM tbl_productdetail WHERE p_name LIKE ?`;
    con.query(query, [`%${searchTerm}%`], (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results);
    });
});


filterRouter.post("/api/checkques",(req,res)=>{
    let que=req.body.input;
    console.log(que);

    con.query("SELECT * FROM tbl_chatbot WHERE question LIKE '%"+ que +"%'",[que],(err,result)=>{
        console.log(result)
        res.send(result);
    })
   
})

module.exports= filterRouter;
