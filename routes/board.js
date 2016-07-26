var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var SecurityManager = require('../myModules/SecurityManager');
var BoardManager = require('../myModules/BoardManager');

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
  res.json({'Result':'Unimplemented'});
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