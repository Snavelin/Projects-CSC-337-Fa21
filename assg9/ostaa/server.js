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
   listings: [Schema.Types.ObjectId],
   purchases: [Schema.Types.ObjectId]
});
const User = mongoose.model('User', UserSchema);

// Express routes

app.get('/get/users', function (req, res) {
   User.find().exec(function (error, result) {
      res.end(JSON.stringify(result, null, 2));
   });
});

app.get('/get/items', function (req, res) {
   Item.find().exec(function (error, result) {
      res.end(JSON.stringify(result, null, 2));
   });
});

app.get('/get/listings/:username', function (req, res) {
   const username = req.params.username;
   User.findOne({username: username}).exec(function (error, result) {
      res.end(JSON.stringify(result.listings, null, 2));
   });
});

app.get('/get/purchases/:username', function (req, res) {
   const username = req.params.username;
   User.findOne({username: username}).exec(function (error, result) {
      res.end(JSON.stringify(result.purchases, null, 2));
   });
});

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
      stat: bodyData.status
   });
   newItem.save();

   // Add this item to user's listings
   User.findOne({username: bodyData.username}).exec(function (error, result) {
      if (error) console.error('Error on finding users');
      result.listings.push(newItem._id);
      result.save();
   });
});

const port = 80;
const hostname = 'localhost';
app.listen(port, hostname, function () {
   console.log(`server running at http://${hostname}:${port}`);
});