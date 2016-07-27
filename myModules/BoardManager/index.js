var db = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var Board = require('./Board')
var UserManager = require('../UserManager')
var ObjectId = require('mongodb').ObjectId;

var BoardManager = function(){}

BoardManager.prototype.add = {
	newBoard : function(name, category, keywords,description, next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log("Could not connect to database")
				next({result:false})
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('boards');
				var newBoard = new Board({name:name,category:category,keywords:keywords,messages:[],description:description,notes:[]})
				collection.insert(newBoard, function(err,val) {
					console.log(val)
					next(val.ops[0]._id)
					db.close();
				});
			}
		})
	},
}

BoardManager.prototype.change = {
	name : function(boardID, newBoardName,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log('Could not connect to the database')
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('boards')
				collection.update(
						{ _id: new ObjectId(boardID) },
						{ $set: { name : newBoardName } }
				)
				db.close();
				next({result:true});
			}
		})
	},
	category : function(boardID, category,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log('Could not connect to the database')
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('boards')
				collection.update(
						{ _id: new ObjectId(boardID) },
						{ $set: { category : category } }
				)
				db.close();
				next({result:true});
			}
		})
	},
	keywords : function(boardID,newKeyWords,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log('Could not connect to the database')
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('boards')
				collection.update(
						{ _id: new ObjectId(boardID) },
						{ $set: { keywords : newKeyWords } }
				)
				db.close();
				next({result:true});
			}
		})
	}
}

BoardManager.prototype.get = {
	board : function(boardID,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log('Could not connect to the database')
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('boards')
				collection.find({"_id" : new ObjectId(boardID)}).toArray(function(err, board) {
					if (err) {
						next({result:false});
					}
					else {
						next(board);
					}
					db.close();
				})
			}
		})
	},
	myBoards : function(username,next) {

		var next2 = function(user) {
			var ids = user.boardsOwned;
			console.log("ids:"+ids[0],username)
			db.connect(url,function(err, db) {
				if (err) {
					console.log('Could not connect to the database')
					next({result:false});
				}
				else {
					console.log('Conection to database established')
					ids = ids.map(function(id) { return ObjectId(id); });
					var collection = db.collection('boards')
					collection.find({_id: {$in: ids}}).toArray(function(err, boards) {
						if (err) {
							next({result:false});
						}
						else {
							console.log('next2'+next)
							next(boards);
						}
						db.close();
					})
				}
			})
		}
		var um = new UserManager();
		um.get.user(username,next2);
	},
	boardListByCategory : function(category,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log('Could not connect to the database')
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('boards')
				collection.find({"category" :category}).toArray(function(err, boards) {
					if (err) {
						next({result:false});
					}
					else {
						next(boards);
					}
					db.close();
				})
			}
		})
	},
	boardListByKeywords : function(keywords,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log('Could not connect to the database')
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('boards')
				collection.find({ keywords: keywords}).toArray(function(err, boards) {
					if (err) {
						next({result:false});
					}
					else {
						next(boards);
					}
					db.close();
				})
			}
		})
	},
	topCategories : function(keywords,next) {
		console.log('Unimplemented');
	}	
}

BoardManager.prototype.remove = {
	board : function(boardID,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log('Could not connect to the database')
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('boards')
				collection.remove({_id:new ObjectId(boardID)})
				db.close();
				next({result:true});
			}
		})
	}	
}

module.exports=BoardManager;