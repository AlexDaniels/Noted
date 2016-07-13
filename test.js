var db = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';

var getUser = function(username) {
	db.connect(url,function(err, db) {
		if (err) {
			console.log('Could not connect to the database')
		}
		else {
			console.log('Conection to database established')
			var collection = db.collection('users')
			collection.find({}).toArray(function(err, docs) {
				console.log(docs);
				db.close();
			})
		}
	})
}

getUser('Balex');