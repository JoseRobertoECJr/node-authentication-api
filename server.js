var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');

var config = require('./config');

const api = require('./api/routes');

const app = express();

mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

const port = process.env.PORT || 8080;

app.use('/api', api);

app.get('*', function(req, res){
    res.send(`API running on http://localhost:${port}/api`)
});

app.listen(port);
console.log(`Server on http://localhost:${port}`);
