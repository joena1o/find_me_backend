const e = require("cors");
var express = require("express");
var conn = require("../utils/conn");
var router = express.Router();


router.get("/fetch/:user", (req, res)=>{

    const user = req.params.user;

    const query = "SELECT * FROM request INNER JOIN users ON request.receiver = users.email WHERE user = ? and status = 'Awaiting' ";

    conn.query(query,[user],(err,result)=>{
        if(err) throw err;
        else{
            res.send(JSON.stringify(result));
        }
    })
    

});

module.exports = router;