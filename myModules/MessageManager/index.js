var db = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var Message = require('./Message')
var Alert = require('./Alert')
var ObjectId = require('mongodb').ObjectId;

var MessageManager = function(){};

MessageManager.prototype.add = {
	messageToBoard : function(boardID, contents, user,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log("Could not connect to database")
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('boards');
				var newMessage = new Message({user:user,contents:contents})
				collection.update(
   					{ _id: new ObjectId(boardID) },
   					{ $push: { messages : newMessage } }
				)
				next({result:true});
				db.close();
			}
		})
	},
	alertToUser : function(username, contents,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log("Could not connect to database")
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('users');
				var newAlert = new Alert({contents:contents})
				collection.update(
   					{ username: username },
   					{ $push: { alerts : newAlert } }
				)
				next({result:true});
				db.close();
			}
		})
	}
}

MessageManager.prototype.get = {
	messages : function(boardID,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log('Could not connect to the database')
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('boards')
				collection.find({_id:new ObjectId(boardID)}).toArray(function(err, board) {
					db.close();
					if (err) {
						next({result:false});
					}
					else {
						next(board[0].messages);
					}
				})
			}
		})
	},
	alerts : function(username,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log('Could not connect to the database')
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('users')
				collection.find({username:username}).toArray(function(err, user) {
					db.close();
					if (err) {
						next({result:false});
					}
					else {
						next(user[0].alerts);
					}
				})
			}
		})
	}
}

MessageManager.prototype.remove = {
	alert : function(username, alertID,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log("Could not connect to database")
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('users');
				collection.update(
   					{ username: username },
   					{ $pop: { alerts : alertID } }
				)
				next({result:true});
				db.close();
			}
		})
	}	
}

module.exports=MessageManager