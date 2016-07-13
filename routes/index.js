var express = require('express');
var router = express.Router();
var mongo = require('mongodb');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Welcome to Noted' });
});
router.get('/home', function(req, res) {
  res.render('home', { title: 'Username' });
});



module.exports = router;
