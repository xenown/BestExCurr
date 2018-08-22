const express = require("express");
const app = express();
const scrape = require("./scrapper/scrapper.js");

app.set("view engine", "ejs");
app.use(express.static('public'));

app.get('/', function(req, res) {
	d = new Date();
	res.render('index', {date: new Date().toDateString()});
	next();
})

app.get('/', scrape);


app.listen(8080, function(){
	console.log("listening on port 8080");
})

