const expree = require("express");
const router = expree.Router();
const conn = require("../utils/conn");


router.get("/fetch/:user",(req,res)=>{   
    const user = req.params.user;
    const query = "SELECT * FROM `request` INNER JOIN `users` on `request`.`user` = `users`.`email` WHERE `request`.`receiver` = ? and `request`.`status` = ? ";
    conn.query(query,[user,'Awaiting'],(err,result)=>{
        if(err) throw err;
        else{
            res.send(JSON.stringify(result));
        }
    })
});

router.get("/accept/:rec/:user", (req, res)=>{


    const rec = req.params.rec;
    const user = req.params.user;

    const q = "UPDATE request SET status = ? WHERE (user = ? && receiver = ?) or (user = ? && receiver = ?)";

    conn.query(q,['Accepted', user, rec, rec, user],  (err, result)=>{

        if(err) throw err;
        else{
            res.send("Done");
        }

    });

});


router.get("/decline/:id", (req, res)=>{

    const id = req.params.id;
    const q = "UPDATE request SET status = ? WHERE request_id = ?";

    conn.query(q,['Decline', id],  (err, result)=>{

        if(err) throw err;
        else{
            res.send("Done");
        }
    });


});


module.exports = router;