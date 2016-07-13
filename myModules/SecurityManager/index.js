var db = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var ObjectId = require('mongodb').ObjectId;

var SecurityManager = function(){};

SecurityManager.prototype.session = {
	login : function(username,hashPassword,req,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log('Could not connect to the database')
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('users')
				collection.find({username:username}).toArray(function(err, user) {
					if (err) {
						next({result:falses});
					}
					else {
						if (authenticate(username, user.password)) {
							req.session.name = username;
							req.session.authenticated = true;
							next({result:true});
						}
						else {
							next({result:false});
						}
					}
					db.close();
				})
			}
		})
	},
	logout : function(req) {
		req.session=null;
	},
	authenticate : function(givenPass,storedPass) {
		if (givenPass === storedPass) {
			return true;
		}
		else {
			return false;
		}
	},
	isUserAuthenticated : function(req) {
		if (req.session.authenticated === true) {
			return true;
		}
		else {
			return false;
		}
	}
}

SecurityManager.prototype.authorize = {
	doesUserOwnBoard : function(username,boardID,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log('Could not connect to the database')
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('users')
				collection.find({username:username}).toArray(function(err, user) {
					if (err) {
						next({result:falses});
					}
					else {
						if (user.boardsOwned.contains(boardID)) {
							 next({result:true})
						}
						else {
							next({result:false});
						}
					}
					db.close();
				})
			}
		})
	},
	doesUserOwnNote : function(username,noteID,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log('Could not connect to the database')
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('notes')
				collection.find({_id:new ObjectId(noteID)}).toArray(function(err, note) {
					if (err) {
						next({result:falses});
					}
					else {
						if (note[0].owner === username) {
							next({result:true})
						}
						else {
							next({result:false})
						}
					}
					db.close();
				})
			}
		})
	}
}

module.exports=SecurityManager;