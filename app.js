//Libraries
const mysql = require("mysql");
const express = require("express");
const cors = require('cors');
const app = express();
const http = require("http");  // socket io requires http 
const {Server} = require("socket.io");
//Libraries

const server = http.createServer(app);

//middlewares
app.use(cors());
app.use(express.json());
//MiddleWares


//Socket IO
const ioserver = new Server(server);

ioserver.on("connection",(socket)=>{

    console.log("user connected: ", socket.id);

    socket.on("send_message", (data)=>{
        console.log(data);
    });

    socket.on("location-change",(data)=>{
    //    socket.emit("location-changed", ("Hello"));
    //loc();
    });

    socket.on("disconnect", ()=>{
        console.log("Disconnected");
    });

});
//Socket IO




//Routes address
const Auth = require("./routes/Auth.js");
const contacts = require("./routes/Contacts");
const Profile = require("./routes/Profile");
const Favourite = require("./routes/Favourites");
const DashHome = require("./routes/DashHome");
const tracking = require("./routes/Tracking");
const request = require("./routes/Request");
const location = require("./utils/UpdataLocation");
//Routes address


//Routes
app.use("/Auth", Auth);
app.use("/Contacts", contacts);
app.use("/Profile", Profile);
app.use("/Favourite", Favourite);
app.use("/Dash", DashHome);
app.use("/Tracking", tracking);
app.use("/Request", request);
//Routes


//Default 
app.get("/", (req, res)=>{
    res.send("Server is working fine");
});
//Default




//Creating Server
server.listen(3001, ()=>{
    console.log("Server is running");
});
//Creating Server






