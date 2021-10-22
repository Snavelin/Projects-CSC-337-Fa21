const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.static('public_html'));

const port = 5000;
const hostname = 'localhost';

const db = mongoose.connection;
const mongoDBURL = `mongodb://${hostname}/chats`;
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

app.post('/chats/post/:alias/:message', function (req, res) {
    console.log('received a message');
    const alias = req.params.alias
    const message = req.params.message
    const thisMessage = new ChatMessage({ time: Date.now(), alias: alias, message: message });
    thisMessage.save();
});

app.get('/chats', function (req, res) {
    const query = ChatMessage.find({});
    query.select('alias message');
    query.sort({ time: 1 });
    query.exec(function (error, result) {
        if (error) console.error('Error getting chat messages');
        res.end(JSON.stringify(result));
    });
});

app.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}`);
});