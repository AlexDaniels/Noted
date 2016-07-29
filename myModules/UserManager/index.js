var db = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var User = require('./User')

var UserManager = function(){}

UserManager.prototype.add = { 
	newUser : function(username,hashPassword,email,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log("Could not connect to database")
				next({result:false})
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('users');
				var next1 = function() {
					var time = new Date().toDateString();
					var welcomeAlert = {user:"Alex", contents:"Welcome to Noted. I hope you enjoy this website.",time:time}
					var newUser = new User({username:username,password:hashPassword,email:email,
											boardsOwnded:[],boardsSubsribed:[],alerts:[welcomeAlert],people:[]})
					collection.insert(newUser);
					db.close();
					next({result:true})
				}
				collection.find({username:username}).toArray(function(err, user) {
					if (err) {
						db.close()
						next({result:'falseuser'});
					}
					else {
						if (user[0]) {
							db.close()
							next({result:'falseuser'})
						}
						else {
							next1()
						}
					}
				})
			}
		})
	},
	boardToOwnerList : function(username, boardID,next) {
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
   					{ $push: { boardsOwned : boardID } }
				)
				next({result:true});
			}
			db.close();
		})
	},
	boardToSubscribedList : function(username, boardID,next) {
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
   					{ $push: { boardsSubscribed : boardID } }
				)

				next({result:true});
				db.close();
			}
		})
	},
	userToPeople : function(callingUser, userIDToBeWatched,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log("Could not connect to database")
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('users');
				collection.update(
   					{ username: callingUser },
   					{ $push: { people : userIDToBeWatched } }
				)
				next({result:true});
				db.close();
			}
		})
	}
}

UserManager.prototype.change = {
	username : function(oldUsername, newUsername,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log('Could not connect to the database')
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('users')
				collection.update(
						{ username: oldUsername },
						{ $set: { username : newUsername } }
				)
				db.close();
				next({result:true});
			}
		})
	},
	password : function(username, newHash,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log('Could not connect to the database')
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('users')
				collection.update(
						{ username: username },
						{ $set: { password : newHash } }
				)
				db.close();
				next({result:true});
			}
		})
	},
	email : function(username,newEmail,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log('Could not connect to the database')
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('users')
				collection.update(
						{ username: username },
						{ $set: { email : newEmail } }
				)
				db.close();
				next({result:true});
			}
		})
	}	
}

UserManager.prototype.get = {
	user : function(username,next) {
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
						next({result:'falseuser'});
					}
					else {
						next(user[0]);
					}
					db.close();
				})
			}
		})
	},
	setup : function() {
		db.connect(url,function(err, db) {
			if (err) {
				console.log('Could not connect to the database')
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('users')
				collection.createIndex( { "username": 1 }, { unique: true } )
			}
			db.close();
		})
	},
	usersPeople : function(username,next) {
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
						next(user[0].people);
					}
				})
			}
		})
	}
}

UserManager.prototype.remove = {
	user : function(username,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log('Could not connect to the database')
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('users')
				collection.remove({username:username})
				db.close();
				next({result:true});
			}
		})
	},
	boardFromOwnerList : function(username, boardID,next) {
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
   					{ $pop: { boardsOwned : boardID } }
				)
				next({result:true});
				db.close();
			}
		})
	},
	boardFromSubscribedList : function(username, boardID,next) {
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
   					{ $pop: { boardsSubscribed : boardID } }
				)

				next({result:true});
				db.close();
			}
		})
	},
	userFromPeople : function(callingUser, userIDBeingWatched,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log("Could not connect to database")
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('users');
				collection.update(
   					{ username: callingUser },
   					{ $pop: { people : userIDBeingWatched } }
				)
				next({result:true});
				db.close();
			}
		})
	}	
}

module.exports = UserManager;