var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var SecurityManager = require('../myModules/SecurityManager');
var BoardManager = require('../myModules/BoardManager');
var UserManager = require('../myModules/UserManager');

/* GET board methods. */
router.get('/', function(req, res) {
  res.json({'Result':'Unimplemented'});
});
router.get('/myboards', function(req, res) {
	if (req.session.authenticated) {
		var bm = new BoardManager();
		var next = function(boards) {
			res.json(boards);
		}
		bm.get.myBoards(req.session.name,next)
	}
	else {

	}
});
router.get('/category', function(req, res) {
  res.json({'Result':'Unimplemented'});
});
router.get('/keywords', function(req, res) {
  res.json({'Result':'Unimplemented'});
});
router.get('/categories', function(req, res) {
  res.json({'Result':'Unimplemented'});
});


/* PUT board methods. */
router.put('/', function(req, res) {
  
	var title = req.query.title;
	var category = req.query.category;
	var description = req.query.description;

	var next = function(id) {
		var next2 = function(val) {
			res.json(val);
		}
		var um = new UserManager();
		console.log('ID:::::::::'+id)
		um.add.boardToOwnerList(req.session.name, id,next2);
	}

	//create board
	var bm = new BoardManager();
	bm.add.newBoard(title, category, null,description, next)
});


/* POST board methods. */
router.post('/name', function(req, res) {
  res.json({'Result':'Unimplemented'});
});
router.post('/category', function(req, res) {
  res.json({'Result':'Unimplemented'});
});
router.post('/keywords', function(req, res) {
  res.json({'Result':'Unimplemented'});
});


/* DELETE board methods. */
router.delete('/', function(req, res) {
  res.json({'Result':'Unimplemented'});
});

module.exports = router;