const expree = require("express");
const router = expree.Router();
const conn = require("../utils/conn");


router.get("/fetch/:user", (req, res)=>{

    const user = req.params.user;
    const q = "SELECT * FROM `request` INNER JOIN `users` on (`request`.`user` = `users`.`email` || `request`.`receiver` = `users`.`email` ) WHERE (`request`.`receiver` = ? || `request`.`user` = ?) and `request`.`status` = ?";

    conn.query(q, [user,user,'Accepted'],(err,result)=>{

        if(err) throw err;
        else{
            res.send(JSON.stringify(result));
        }

    });

});


router.get("/fetchEnded/:user", (req, res)=>{

    const user = req.params.user;

    const query = "SELECT * FROM request WHERE (user = ? or receiver = ?) and status = 'Ended' ";

    conn.query(query, [user, user], (err, result)=>{

        if(err) throw err;
        else{
            res.send(JSON.stringify(result));
        }

    });


});


router.get("/end/:id", (req, res)=>{

    const id = req.params.id;
    const q = "UPDATE request SET status = ? WHERE request_id = ? ";

    conn.query(q, ['Ended', id],(err,result)=>{

        if(err) throw err;
        else{
            res.send("Done");
        }

    });

});

module.exports = router;