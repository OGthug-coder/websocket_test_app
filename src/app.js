const http = require("http");
const express = require( "express");
const WebSocket = require( "ws");
const path = require("path");

const app = express();

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on('connection', ws => {

    ws.on('message', m => {
        console.log(m.toString());
        webSocketServer.clients.forEach(client => client.send(m));
    });

   ws.on("error", e => ws.send(e));

   ws.send('Hi there, I am a WebSocket server');

});

server.listen(8999, () => console.log("Server started"))

app.get("/", (req, res) => {
    res.sendFile(path.join(`${__dirname}/index.html`));
});