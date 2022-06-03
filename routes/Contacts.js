const express = require("express");
const conn = require("../utils/conn");
const router = express.Router();




router.get("/searchContact/:key",(req, res)=>{
    const query = "SELECT * FROM users WHERE phone = ?";
    const key = req.params.key;
    conn.query(query, [key], (err, result)=>{
        if(err) throw err;
        else{
            res.send(JSON.stringify(result));
        }
    });

});



router.post("/findMeRequest", (req, res)=>{
    var date = new Date();
    const user = req.body.user;
    const receiver = req.body.receiver;
    const time =  date.toJSON().slice(0,10);
    var q = "SELECT * FROM `request` INNER JOIN `users` on `request`.`user` = `users`.`email` WHERE (`request`.`receiver` = ? || `request`.`user` = ?) and (`request`.`receiver` = ? || `request`.`user` = ?) and `request`.`status` = ?";

    conn.query(q, [user,receiver,receiver,user,"Awaiting"], (err,result)=>{
        if(result.length<1){
            var query = "INSERT INTO request(user,receiver,time_sent) VALUES(?,?,?)";
            conn.query(query, [user, receiver, time], (err, result)=>{
                if(err) throw err;
                else{
                    res.send("Sent");
                }
            });
        }else{
            const request_Id = result[0]['request_id'];
            console.log(request_Id);
            var query = "UPDATE request SET user = ?, receiver = ?, time_sent = ? WHERE request_id = ?";
            conn.query(query, [user, receiver, time, request_Id], (err, result)=>{
                if(err) throw err;
                else{
                    res.send("Sent");
                }
            });
        }

    });
});




module.exports = router;