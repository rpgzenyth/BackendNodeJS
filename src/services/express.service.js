require('dotenv').config();
const express = require('express');
const app = express();
const apiRouter = require('../routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const socket = require("socket.io");

exports.start = () => {
    
    const port = process.env.PORT;
    app.use(cors());
    app.use(bodyParser.json());
    app.use('/api/v1', apiRouter);

    const server = app.listen(port, (err) => {
        if (err) {
            console.log(`Error : ${err}`);
            process.exit();
        }
        console.log(`app is running on port ${port}`);
    })

    const io = socket(server,{
        cors:{
            origin: "http://localhost:5000",
            credentials: true,
        },
    });

    global.onlineUsers = new Map();
    io.on("connection", (socket) => {
        global.chatSocket = socket;
        socket.on("add-user", (userId) => {
            onlineUsers.set(userId, socket.id);
        });

        socket.on("send-msg", (data) => {
            const sendUserSocket = onlineUsers.get(data.to);
            if(sendUserSocket){
                socket.to(sendUserSocket).emit("msg-recieve", data.msg);
            }
        })
    })
}