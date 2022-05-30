var express = require("express");
var router = express.Router();
var conn = require("../utils/conn.js");


router.post("/signUp",(req, res)=>{
    var check = "SELECT * FROM users WHERE phone = ? and email = ?";
    var signup = "INSERT INTO users(first_name,last_name,phone,email,password) VALUES(?,?,?,?,?)";
    const name = req.body.user;
    const surname = req.body.surname;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    conn.query(check, [phone, email], (err, result)=>{
        if(err) throw err;
        else{
            if(result.length > 0){
                res.end("User with this credentials already exists");
                return;
            }else{
                conn.query(signup, [name, surname, phone, email, password], (err, result)=>{
                    if(err) throw err;
                    else{
                        res.end("Created");
                    }
                });
            }
        }
         });
    });

    


router.post("/signIn", (req, res)=>{
    const user = req.body.user;
    const password = req.body.password;
    var signIn = "SELECT * FROM users WHERE email = ? and password = ?";
    conn.query(signIn, [user, password], (err,result)=>{
        if(err) throw  err;
        else{
            if(result.length>0)
            res.send(JSON.stringify(result))
            else
            res.send("null");
        }

    });
});


module.exports = router;