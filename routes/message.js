var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var SecurityManager = require('../myModules/SecurityManager');

/* GET methods for messages */
router.get('/', function(req, res) {
  res.json({'Result':'Unimplemented'});
});
router.get('/alerts', function(req, res) {
  res.json({'Result':'Unimplemented'});
});

/* GET methods for messages */
router.put('/', function(req, res) {
  res.json({'Result':'Unimplemented'});
});
router.put('/alerts', function(req, res) {
  res.json({'Result':'Unimplemented'});
});

/* GET methods for messages */
router.delete('/alerts', function(req, res) {
  res.json({'Result':'Unimplemented'});
});



module.exports = router;