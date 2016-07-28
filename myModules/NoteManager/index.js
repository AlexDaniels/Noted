var db = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var Note = require('./Note')
var ObjectId = require('mongodb').ObjectId;

var NoteManager = function(){};

NoteManager.prototype.add = {
	note : function(boardID, callingUser, coordinates, bgColor,textColor,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log("Could not connect to database")
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('notes');
				var newNote = new Note({boardID:boardID,coordinates:coordinates,bgColor:bgColor,
				textColor:textColor,owner: callingUser})
				collection.insert(newNote,function(err,val) {
					next(val.ops[0])
					db.close();
				});
			}
		})
	}
}

NoteManager.prototype.change = {
	note : function(noteID,angle,contents,bgcolor,textcolor,coordinates,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log('Could not connect to the database')
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('notes')
				collection.update(
						{ _id: new ObjectId(noteID) },
						{ $set: { angle : angle, content:contents,bgColor:bgcolor,textColor:textcolor,coordinates:coordinates, state: {mode:'normal',type:'text',editingUser:''} } }
				)
				db.close();
				next({result:true});
			}
		})
	},
	modeToEdit : function(noteID,callingUser,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log('Could not connect to the database')
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('notes')
				collection.update(
						{
							_id: new ObjectId(noteID)
  						 },
   						{ $set: { "state.editingUser" : callingUser, "state.mode" : 'editing'   } }
				)
				db.close();
				next({result:true});
			}
		})
	},
	modeToNormal : function(noteID,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log('Could not connect to the database')
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('notes')
				collection.update(
						{
							_id: new ObjectId(noteID)
  						 },
   						{ $set: { "state.mode" : 'normal', 'state.editingUser':''} }
				)
				db.close();
				next({result:true});
			}
		})
	},
	into : {
		subBoard : function(noteID,next) {
			db.connect(url,function(err, db) {
			if (err) {
				console.log('Could not connect to the database')
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('notes')
				collection.update(
						{ _id: new ObjectId(noteID) },
						{ $set: { 'state.type' : 'subboard' } }
				)
				db.close();
				next({result:true});
			}
		})
		},
		image : function(noteID,next) {
			db.connect(url,function(err, db) {
			if (err) {
				console.log('Could not connect to the database')
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('notes')
				collection.update(
						{ _id: new ObjectId(noteID) },
						{ $set: { 'state.type' : 'image' } }
				)
				db.close();
				next({result:true});
			}
		})
		},
		video : function(noteID,next) {
			db.connect(url,function(err, db) {
			if (err) {
				console.log('Could not connect to the database')
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('notes')
				collection.update(
						{ _id: new ObjectId(noteID) },
						{ $set: { 'state.type' : 'video' } }
				)
				db.close();
				next({result:true});
			}
		})
		}
	}
}

NoteManager.prototype.get = {
	notes : function(boardID,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log('Could not connect to the database')
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('notes')
				collection.find({"boardID" : boardID}).toArray(function(err, notes) {
					if (err) {
						next({result:false});
					}
					else {
						next(notes);
					}
					db.close();
				})
			}
		})
	}
}

NoteManager.prototype.remove = {
	note : function(noteID,next) {
		db.connect(url,function(err, db) {
			if (err) {
				console.log("Could not connect to database")
				next({result:false});
			}
			else {
				console.log('Conection to database established')
				var collection = db.collection('notes');
				collection.remove({_id:new ObjectId(noteID)})
				next({result:true});
				db.close();
			}
		})
	}
}

module.exports=NoteManager;