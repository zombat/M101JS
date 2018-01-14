console.log('Starting server.js');
require('dotenv').load();
const expressPort = process.env.PORT,
	express = require('express'),
	routes = require('./app/routes.js'),
	app = express()
	mongo = require('mongodb').MongoClient,
	mongo_user = process.env.MONGO_USER,
	mongo_password = encodeURIComponent(process.env.MONGO_PASSWORD),
	mongo_string = process.env.MONGO_STRING,
	mongo_uri = 'mongodb://' + mongo_user + ':' + mongo_password + '@' + process.env.mongo_string;
	
	
// Set routes and start server.
routes(app, mongo, mongo_uri);
app.listen(expressPort);
console.log('Express running on port ' + expressPort);