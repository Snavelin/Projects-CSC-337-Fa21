/*
* Author: Dylan Snavely
* Purpose: The server for the Ostaa online store. It defines Express routes to handle registering
* new users, new items, and querying the store for the users and items that are on record.
* Users and items are stored as documents in a database using the mongoDB DMS and mongoose.
*/

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

// Returns a JSON list of all users in the database
app.get('/get/users', function (req, res) {
   User.find().exec(function (error, result) {
      res.end(JSON.stringify(result, null, 2));
   });
});

// Returns a JSON list of all items in the database
app.get('/get/items', function (req, res) {
   Item.find().exec(function (error, result) {
      res.end(JSON.stringify(result, null, 2));
   });
});

// Returns a JSON list of all the listings that belong to a given username
app.get('/get/listings/:username', function (req, res) {
   const username = req.params.username;
   User.findOne({username: username}).exec(function (error, result) {
      res.end(JSON.stringify(result.listings, null, 2));
   });
});

// Returns a JSON list of all the purchases that belong to a given username
app.get('/get/purchases/:username', function (req, res) {
   const username = req.params.username;
   User.findOne({username: username}).exec(function (error, result) {
      res.end(JSON.stringify(result.purchases, null, 2));
   });
});

// Returns a JSON list of the users whose username has the given substring
app.get('/search/users/:keyword', function (req, res) {
   const keyword = req.params.keyword;
   User.find({username: new RegExp(keyword)}).exec(function (error, result) {
      res.end(JSON.stringify(result, null, 2));
   });
});

// Returns a JSON list of the items whose description has the given substring
app.get('/search/items/:keyword', function (req, res) {
   const keyword = req.params.keyword;
   Item.find({description: new RegExp(keyword)}).exec(function (error, result) {
      res.end(JSON.stringify(result, null, 2));
   });
});

// Adds a new user to the database
app.post('/add/user', function (req, res) {
   const bodyData = JSON.parse(req.body);
   const newUser = new User({
      username: bodyData.username,
      password: bodyData.password,
      listings: [],
      purchases: []
   });
   newUser.save();
   res.end('saved');
});

// Adds a new item to the database.
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
   res.end('saved');
});

const port = 80;
app.listen(port, function () {
   console.log('server is running');
});