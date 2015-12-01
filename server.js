var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    expressValidator = require('express-validator');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies
app.use(expressValidator());

var config = require('config');

var router = express.Router();

var listenport = config.get("server.port");

require('./app/routes.js')(app, router);

var server = app.listen(parseInt(listenport), function() {
    console.log("Listening to port %s", server.address().port);
});