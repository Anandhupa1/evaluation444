const express = require('express');
const { dirname } = require('path');
const cors = require("cors")
const app = express();
require('dotenv').config();
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static("public"))
const port = process.env.port;
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer,{cors:{origin:"*"}})
app.use(cors())
app.get("/",async (req,res)=>{
    res.render("details")
})

app.get("/chat",(req,res)=>{
    res.render("index")
})
io.on("connection",(socket)=>{
    console.log("user connected");
    socket.emit("message","hi welcome");
    socket.broadcast.emit("message","a new user has joined");

    socket.on("disconnect",()=>{
        io.emit("message","a user left")
    });
    socket.on("new_message",(data)=>{
        io.emit('new_message',data)
    })

});
httpServer.listen(port,()=>{
    console.log(`server started @ http://localhost:${port}`)
})

