const express = require('express');
const http = require('http');
const path = require('path');
const { startSocketConnection, handleSockets } = require('./socket');
const { shortenUrl } = require('./utils/url-shortener');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, '../public'))); // Get public path

// Handle socket connections
const io = startSocketConnection(server);
handleSockets(io);

// Endpoint for shortening link
app.get('/v1/test/shortener', shortenUrl);

// Point all routes to index.html to be served by react-router
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

//run server
server.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});
