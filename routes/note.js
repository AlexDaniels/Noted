var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var SecurityManager = require('../myModules/SecurityManager');

/* GET note methods*/
router.get('/', function(req, res) {
  res.json({'Result':'Unimplemented'});
});


/* PUT note methods*/
router.put('/', function(req, res) {
  res.json({'Result':'Unimplemented'});
});


/* POST note methods*/
router.post('/', function(req, res) {
  res.json({'Result':'Unimplemented'});
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
  res.json({'Result':'Unimplemented'});
});
router.post('/editmode/exit', function(req, res) {
  res.json({'Result':'Unimplemented'});
});


/* DELETE note methods*/
router.delete('/', function(req, res) {
 res.json({'Result':'Unimplemented'});
});



module.exports = router;