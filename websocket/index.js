import express from 'express';
import cors from 'cors';
import {WebSocketServer }from 'ws';
import http from 'http';

const app = express();
app.use(cors());

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

let docs = "";

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.send(JSON.stringify({
        type : 'init',
        data : docs
    }));

    ws.on('message' , (message) => {
        try{
            const paresedMessage = JSON.parse(message);
            console.log('Received message : ', paresedMessage);
            if(paresedMessage.type === 'update'){
                docs = paresedMessage.data;
                wss.clients.forEach((client) => {
                    if(client.readyState === WebSocket.OPEN){
                        client.send(JSON.stringify({
                            type : 'update',
                            data : docs
                        }));
                    }
                });
            }
        }
        catch(e){
            console.log("Error parsing : ",e);
        }   
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

const port = 5001;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});