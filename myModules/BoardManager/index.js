var db = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var Board = require('./Board')
var ObjectId = require('mongodb').ObjectId;

var BoardManager = function(){}

BoardManager.prototype.add = {
	newBoard : function(name, category, keywords,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log("Could not connect to database")
				next({result:false})
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('boards');
				var newBoard = new Board({name:name,category:category,keywords:keywords,messages:[],notes:[]})
				collection.insert(newBoard);
				next({result:true})
				db.close();
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