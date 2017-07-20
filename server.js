// Dependencies 
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// scrapers
var request = require("request");
var cheerio = require("cheerio");

mongoose.Promise = Promise; 

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
	extended: false
}));

// public dir static
app.use(express.static("public"));

// Database config with mongoose
mongoose.connect("mongodb:")
var db = mongoose.connection; 

// Mongoose errors
db.on("error", function(error) {
	console.log("Mongoose Error: ", error);
	)};

// Once logged into the db through mongoose, success message shown 
db.once("open", function() {
	console.log("Mongoose connectino successful.");
});
