const homeRoute = require('express').Router();
const con = require('../../config/db');

homeRoute.get("/api/newproductlist", (req, res) => {
    const sel = "SELECT * FROM tbl_productdetail where when_add_item between (select min(when_add_item) from tbl_productdetail) and (select max(when_add_item) from tbl_productdetail) order by when_add_item desc limit 3";
    con.query(sel, (err, result) => {
        if (err) {
            console.error("Error fetching product list:", err);
            res.status(500).json({ error: "Error fetching product list" });
        } else {
            res.json(result);
        }
    });
});

module.exports = homeRoute;