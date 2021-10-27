const express = require('express');
const app = express();
const parser = require('body-parser');
const mongoose = require("mongoose");

app.use(express.static('public_html'));
app.use(parser.text({type: '*/*'}));

// Connect to database

const db = mongoose.connection;
const mongoDBURL = 'mongodb://localhost/store';
mongoose.connect(mongoDBURL, { useNewUrlParser: true });

db.on('error', function () {
   console.error('Error when connecting to mongoDB');
});

// Schemas

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
   title: String,
   description: String,
   image: String,
   price: Number,
   stat: String
});
const Item = mongoose.model('Item', ItemSchema);

const UserSchema = new Schema({
   username: String,
   password: String,
   listings: Array,
   purchases: Array
});
const User = mongoose.model('User', UserSchema);

// Express routes

app.post('/add/user', function (req, res) {
   const bodyData = JSON.parse(req.body);
   // todo: Check if this user already exists
   const newUser = new User({
      username: bodyData.username,
      password: bodyData.password,
      listings: [],
      purchases: []
   });
   newUser.save();
   res.end('saved');
});

app.post('/add/item/:username', function (req, res) {
   const bodyData = JSON.parse(req.body);
   const newItem = new Item({
      title: bodyData.title,
      description: bodyData.description,
      image: bodyData.image,
      price: bodyData.price,
      stat: bodyData.stat
   });
   newItem.save();

   // Add this item to user's listings
   // todo: Add this item to user's listings
   const query = User.findOne({username: bodyData.username});

   // query.select('listings');
   // query.exec(function (error, result) {
   //    if (error) console.error('Error on finding users');
   // });
});

const port = 80;
const hostname = 'localhost';
app.listen(port, hostname, function () {
   console.log(`server running at http://${hostname}:${port}`);
});