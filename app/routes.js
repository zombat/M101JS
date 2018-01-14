module.exports = function (app) {
	const assert = require('assert');
	
	app.route('/helloworld')
		.get(function (httpReq, httpRes) {
			httpRes.end('Hello, world!');
		});
		
	app.route('/mongotest')
		.get(function (httpReq, httpRes) {
			mongo.connect(mongo_uri, function(err, client) {
				assert.equal(null,err);
				console.log('Connected to mongodb server');
				
				const db = client.db('m101js');
				
				if(db) {
					db.collection('test', function (err, collection) {  
						collection.findOne({}).then(function(document) {
							if(document){
								httpRes.setHeader('Content-Type', 'application/json');
								httpRes.end(JSON.stringify(document));
							} else {
								document = {'zeroResults' : true }
								httpRes.setHeader('Content-Type', 'application/json');
								httpRes.end(JSON.stringify(document));
							}
							client.close();
							console.log('Closed connection to mongodb server');
						});
					});
				}
			});
		});
		
};