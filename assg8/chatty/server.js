/*
* Author: Dylan Snavely
* Purpose: The server for the Chatty app. It defines Express routes to handle new text message
* requests and to fetch all text messages currently on record. Text messages are
* stored as documents in a database using the mongoDB DMS and mongoose.
*/

const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.static('public_html'));

const db = mongoose.connection;
const mongoDBURL = `mongodb://localhost/chats`;
mongoose.connect(mongoDBURL, { useNewUrlParser: true });

db.on('error', function () {
   console.error('Error on connecting to mongoDB');
});

// Schemas

const Schema = mongoose.Schema;
const ChatMessageSchema = new Schema({
    time: Number,
    alias: String,
    message: String
});
const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);

// Express routes

// Adds a new message to the database
app.post('/chats/post/:alias/:message', function (req, res) {
    console.log('received a message');
    const alias = req.params.alias
    const message = req.params.message
    const thisMessage = new ChatMessage({ time: Date.now(), alias: alias, message: message });
    thisMessage.save();
});

// Sends all text messages currently on record
app.get('/chats', function (req, res) {
    const query = ChatMessage.find({});
    query.select('alias message');
    query.sort({ time: 1 });
    query.exec(function (error, result) {
        if (error) console.error('Error getting chat messages');
        res.end(JSON.stringify(result));
    });
});

const port = 5000;
const hostname = '137.184.186.78';
app.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}`);
});