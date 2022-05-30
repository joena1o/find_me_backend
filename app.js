const mysql = require("mysql");
const express = require("express");
const cors = require('cors');
const app = express();
const http = require("http"); // socket io requires http 
const {Server} = require("socket.io");

const server = http.createServer(app);

//middlewares
app.use(cors());
app.use(express.json());
//MiddleWares



//Routes address
const Auth = require("./routes/Auth.js");
const contacts = require("./routes/Contacts");
const Profile = require("./routes/Profile");
const Favourite = require("./routes/Favourites");
const DashHome = require("./routes/DashHome");
const tracking = require("./routes/Tracking");
const request = require("./routes/Request");

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


// const ioserver = new Server(server, {
   
//     cors:{
//         origin:"http://localhost:3000",
//         methods: ['GET',"POST"],
//     }
    
// });


// ioserver.on("connection",(socket)=>{

//     console.log("user connected: ", socket.id);
 

//     socket.on("send_message", (data)=>{

//         socket.broadcast.emit("receive_message", data);

//         // console.log(data);

//     });

// });




app.get("/", (req, res)=>{
    res.send("Server is working fine");
});





server.listen(3001, ()=>{
    console.log("Server is running");
});






