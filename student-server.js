var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
var request = require('request');
var consolidate = require('consolidate');

app.engine( "tmpl", consolidate.mustache ); // create a tempalte engine for mustache called 'tmpl'
app.set( "view engine", "tmpl" ); //use 'tmpl' (mustache) to render views
app.set( "views", __dirname + "/public/tmpl" ); //res.render(viewname) -> public/tmpl/viewname.tmpl

app.get('/', function(req, res){
	request("http://localhost:1337/getColors", function(err, response, body){
		body = JSON.parse(body);
		console.log('queue', body.queuedColors);
		res.render("index", {currentColors : body.currentColors, queuedColors: body.queuedColors});
	});
});

app.post('/addColor', function(req, res){
 //How do we handle our own form data?
 res.send();
});

//We want to add a function to get the color data, then emit that data to the client, which will update.

//Some Notes
//use app.render to render a view without response
//We're going to use socket.io
//and request

app.use( express.static( __dirname + "/public" ) );
app.listen(3000);
