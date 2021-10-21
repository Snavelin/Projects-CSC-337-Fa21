const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.static('public_html'));

const port = 5000;
const hostname = 'localhost';

// Express routes

app.post('/chats/post/:alias/:message', function (req, res) {
    console.log('received a message');
});

app.get('/chats', function (req, res) {

});

app.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}`);
});