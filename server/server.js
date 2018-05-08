const http = require('http');
const express = require('express');
const socketio = require('socket.io')

const app = express();

const clientPath = `${__dirname}/../client`;
console.log(`serving from static ${clientPath}`);

app.use(express.static(clientPath));
const server = http.createServer(app);

const io = socketio(server);

let waitingPlayer = null;

io.on('connection', (socket) => {

	if(waitingPlayer){
		[socket,waitingPlayer].forEach(s => s.emit('message','Game starting'));
		waitingPlayer = null;
	}
	else{
		waitingPlayer = socket;
		waitingPlayer.emit('message','waiting for an opponet');
	}

    console.log('someOne conneced!!');
	socket.emit('message', 'you are connected');

	socket.on('message', (text) => {
		io.emit('message', text);
	})
});

server.on('error', (err) => {
	console.log('Server error: ', err);
});

server.listen(8080, () => {
	console.log("**started server on 8080**");
});