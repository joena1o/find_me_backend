const conn = require("./conn.js");
const express = require("express");
const router = express.Router();


router.post("/location", (req, res)=>{

    const user = req.body.user;
    const lat = req.body.lat;
    const lng = req.body.lng;

    // const query = "UPDATE users SET lat = ?, lng = ? WHERE email = ?";

    // conn.query(query,[lat,lng,user], (err, result)=>{

    //     if(err) throw err;
    //     else{
    //         res.send("Done");
    //     }

    // });

    console("location is working");


});

module.exports = router;