const mysql = require("mysql");

const con = mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"",
        database:"biolife"
    }
)

con.connect(function(err){
    if(err) 
    throw err
    console.log(`database connected on server http://localhost:1121`)
});

module.exports = con;