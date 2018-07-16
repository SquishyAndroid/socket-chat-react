// import openSocket from 'socket.io-client';
// import moment from 'moment';
// const socket = openSocket();

exports.connect = (callback) => {
	socket.on('connect', () => {
		socket.emit('join', (err) => {
	        if (err) {
	            alert(err);
	            window.location.href = "/";
	        }
	    });
	});
}

exports.createMessage = (sessionId, text) => {
	socket.emit('createMessage', {
		sessionId: sessionId,
		text: text
	});
}

exports.displayMessage = () => {
	socket.on('newMessage', (message) => {
		return message;
    });
}

exports.updateUserList = () => {

}

exports.disconnect = () => {
	// Message to display when user disconnects
	socket.on('disconnect', () => {
	    console.log('Disconnected from server');
	});
}