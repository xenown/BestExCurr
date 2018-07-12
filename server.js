const express = require("express");
const app = express();

app.get('/', function(req, res) {
	res.send("HELLO");
})

app.listen(8080, function(){
	console.log("listening on port 8080");
})

app.set("view engine", "ejs");