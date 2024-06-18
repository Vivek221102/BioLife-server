const profileroute = require('express').Router();
const con = require('../../config/db')

profileroute.get("/api/myprofile",(req,res)=>{
    let perameter = req.query.id;

    const sel = "select * from tbl_registration where user_id=?";
    con.query(sel,[perameter],(err, result)=>{

        res.send(result);
    })
})

profileroute.post("/api/savepasswrd",(req,res)=>{
    var id = req.body.id;
    var password =req.body.password;
    var newpassword =req.body.newpassword;
    var retypepass =req.body.retypepass;

   
    const sel="select * from tbl_registration where user_id=? and pass=?"
    con.query(sel,[id,password],(err,result)=>{
      
        if(result.length > 0){
            const update= "update tbl_registration SET pass=? where user_id=? and pass=?"
            con.query(update,[newpassword, id, password],(err,result)=>{
                if(result){
             
                    res.send(result);
                    
                }
                else{
                    res.send({
                        msg:"something wrong"
                    })
                }
            })
        }else{
            res.send({msg:"password doesn't match"});
        }
    })
})

profileroute.post("/api/changepassadmin",(req,res)=>{
   
    var password =req.body.password;
    var newpassword =req.body.newpassword;
    var retypepass =req.body.retypepass;


   
    const sel="select * from tbl_registration where pass=?"
    con.query(sel,[password],(err,result)=>{
      
        if(result.length > 0){
            const update= "update tbl_registration SET pass=? where  pass=?"
            con.query(update,[newpassword, password],(err,result)=>{
                if(result){
           
                    res.send(result);
                    
                }
                else{
                    res.send({
                        msg:"something wrong"
                    })
                }
            })
        }else{
            res.send({msg:"password doesn't match"});
        }
    })
})


profileroute.post("/api/forgotpass", (req, resp) => {
    var email = req.body.email;
    const query = "SELECT * FROM tbl_registration WHERE mail_id=?";
    con.query(query, [email], (err, result) => {
        if (result.length > 0) {
            var pass = result[0].pass;
            var name = result[0].first_name;
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: "vsp22112002@gmail.com",
                    pass: "aqaxzcipeheivkvw",
                },
            });
            const message = {
                from: "vsp22112002@gmail.com",
                to: email,
                subject: "biolife",
                html: `
                                <html>
                                    <body style="font-family: Arial, sans-serif;">
                                   
                                        <h2 style="color: #333;">Password Reset Request</h2>
                                        <p>Dear ${name},</p>
                        
                                        <p>We've received a request to reset the password for your Biolife Store account.</p>
                        
                                        <p>Your new password is: <strong>${pass}</strong></p>
                        
                                        <p>If you didn't make this request, please ignore this email or contact our support team immediately.</p>
                        
                                        <p style="margin-top: 30px; color: #888;">
                                            Best regards,<br>
                                            The Biolife Store Team
                                        </p>
                        
                                        <p style="margin-top: 20px; font-size: 12px; color: #999;">
                                            This is an automated message. Please do not reply to this email.
                                        </p>
                        
                                    </body>
                                </html>
                            `                    };
                            transporter.sendMail(message, (error, info) => {
                                                if (error) {
                                                  console.error(error);
                                                } else {
                                                  resp.send(result);
                                                  console.log("Email sent:", info.response);
                                                }
                                             
                                              });
        } else {
            resp.status(404).send({ message: "You do not have an account" });
        }
    });
});


module.exports = profileroute;

