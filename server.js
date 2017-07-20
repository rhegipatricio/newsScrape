// Dependencies 
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// scrapers
var request = require("request");
var cheerio = require("cheerio");

mongoose.Promise = Promise; 

var app = express();
