const e = require("cors");
const express = require("express");
const router = express.Router();
const conn = require("../utils/conn");


router.get("/fetch/:user",(req,res)=>{
    const user = req.params.user
    const query = "SELECT * FROM favourites WHERE user = ?";

    conn.query(query,[user],(err,result)=>{
        if(err) throw err;
        else{
            res.end(JSON.stringify(result));
        }
    });

});


router.post("/addContact", (req,res)=>{
    const user = req.body.user;
    const contact_id = req.body.id;
    const q = "INSERT INTO favourites(user,contact_id) VALUES(?,?)";
    conn.query(q,[user,contact_id],(err,result)=>{
        if(err) throw err;
        else{
            res.send("Added");
        }
    });

});


router.get("/remove/:key", (req,res)=>{

    const key = req.params.key;
    const q = "DELETE FROM favourites WHERE fav_id = ?";

    conn.query(q, [key],(err,result)=>{
        if(err) throw err;
        else{
            res.send("Removed");
        }
    })

})

module.exports = router;