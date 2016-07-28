var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var SecurityManager = require('../myModules/SecurityManager');
var NoteManager = require('../myModules/NoteManager');

/* GET note methods*/
router.get('/', function(req, res) {
	var id = req.query.id;
	var next = function(notes) {
		console.log(notes)
		res.json(notes)
	}
	var nm = new NoteManager();
	nm.get.notes(id,next)
});


/* PUT note methods*/
router.put('/', function(req, res) {
	var boardID = req.query.boardID
	var callingUser = req.session.name
	var x = req.query.x
	var y = req.query.y
	var coordinates = {x:x,y:y}
	var bgColor = req.query.bgColor
	var textColor = req.query.textColor
	var next = function(value) {
		console.log(value)
		res.json(value)
	}

	var nm = new NoteManager()
	nm.add.note(boardID, callingUser, coordinates, bgColor,textColor,next)
});


/* POST note methods*/
router.post('/', function(req, res) {
  var noteID = req.query.noteid;
  var angle = req.query.angle;
  var contents = req.query.contents;
  var bgcolor = req.query.bgcolor
  var textcolor = req.query.textcolor;
  var x = req.query.x
  var y = req.query.y
  var coordinates = {x:x,y:y}
  var next = function(value) {
  	res.json(value)
  }
  var nm = new NoteManager()
  nm.change.note(noteID,angle,contents,bgcolor,textcolor,coordinates,next);
  console.log(noteID,angle,contents,bgcolor,textcolor,coordinates,next)
});

router.post('/into/subboard', function(req, res) {
  res.json({'Result':'Unimplemented'});
});
router.post('/into/image', function(req, res) {
  res.json({'Result':'Unimplemented'});
});
router.post('/into/video', function(req, res) {
  res.json({'Result':'Unimplemented'});
});

router.post('/editmode/enter', function(req, res) {
  	var id = req.query.id
  	var user = req.session.name
	var nm = new NoteManager();
	var next = function(value) {
		res.json(value)
	}
	nm.change.modeToEdit(id,user,next);
});
router.post('/editmode/exit', function(req, res) {
	var id = req.query.id
	var nm = new NoteManager();
	var next = function(value) {
		res.json(value)
	}
	nm.change.modeToNormal(id,next);
});


/* DELETE note methods*/
router.delete('/', function(req, res) {
	var id = req.query.id
	var nm = new NoteManager();
	var next = function(value) {
		res.json(value)
	}
	nm.remove.note(id,next)
});



module.exports = router;