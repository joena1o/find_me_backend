const express = require("express");
const conn = require("../utils/conn.js");
const router = express.Router();


router.get("/fetch/:user", (req, res)=>{
    var user = req.params.user;
    var q = "SELECT * FROM users WHERE email = ?";
    conn.query(q, [user], (err, result)=>{
        if(err) throw err;
        else{
            res.send(JSON.stringify(result));
        }
    });
});


module.exports = router;