const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
	pingInterval: 10000,
  	pingTimeout: 5000
});
let users = new Users(); // Instantiate user class

app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

io.on('connection', (socket) => {

	// Actions to complete on user connecting
	socket.on('join', (params, callback) => {
		console.log(params);
		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		socket.emit('newMessage', generateMessage('Notice', 'Welcome to the chat app!'));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Notice', `${params.name} has joined`));
		callback();
	});

	// Sends a message from server to client
	socket.on('createMessage', (message, callback) => {
		console.log(message);
		let user = users.getUser(socket.id);
		if (user) {
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text, message.imageData, message.sessionId));
		}
	});

	// Actions to complete on user disconnect
	socket.on('disconnect', () => {
		let user = users.removeUser(socket.id);
		if (user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Notice', `${user.name} has left.`));
		}
	});

});

//run server
server.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});
