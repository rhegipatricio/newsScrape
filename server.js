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
	console.log("Mongoose connection successful.");
});

// Routes

app.get("/scrape", function(req, res) {
	request("http://", function (error, response, html) {
		var $ = cheerio.load(html);

		$("").each(function(i, element){

			var result = {};

			result.title = $(this).children("a").text();
			result.link = $(this).children("a").attr("href");

			var entry = new Artile(result);

			entry.save(function(err, doc) {
				// errors logged
				if (err) {
					console.log(err);
				}

				else {
					console.log(doc);
				}
			});
		});
	});
	// Tells browser that the text has been scraped
	res.send("Scrape Complete");
});

app.get("/articles", function(req, res) {
	// Grabs documents in Article array
	Article.find({})
		.populate("note")
		.exec(function(error, doc) {

		if (error) {
			console.log(error);
		}	
		else {
			res.json(doc);
		}
	});
});

app.get("/articles/:id", function(req, res) {

	Article.findOne({ "_id": req.params.id })

	.populate("note")

	.exec(function(error, doc) {
		// error logging
		if (error) {
			console.log(error);
		}
		else {
			res.json(doc);
		}
	});
});

app.post("/articles/:id", function(req, res) {

	var newNote = new Note(req.body);

	newNote.save(function(error, doc) {

		if (error) {
			console.log(error);
		}
		else {

			Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })

			.exec(function(err, doc) {

				if (err) {
					console.log(err);
				}
				else {

					res.send(doc);
				}
			});
		}
	});
});