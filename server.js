const express = require("express");
const app = express();
const server = require("http").createServer(app);
const socketio = require("socket.io");

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/Client/index.html");
});

app.get("/*", function (req, res) {
    let file = req.params[0];
    res.sendFile(__dirname + "/Client/" + file);
});


server.listen(process.env.PORT || 8000);
console.log("Server started on localhost:8000");

const io = socketio(server, {});

io.on('connection', (socket) => {
    console.log(`Socket Connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Socket Disconnected: ${socket.id}`);
    });
});
