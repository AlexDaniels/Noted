var express = require('express');
var router = express.Router();
var mongo = require('mongodb');

/* GET home page. */
router.get('/', function(req, res) {
	if (req.session.name) {
		res.render('home', { title: 'Username' });
	}
	else {
		res.render('index',{ title: 'Noted' });
	}
});
router.get('/home', function(req, res) {
	if (req.session.name) {
		res.render('home', { title: req.session.name });
	}
	else {
		res.render('index',{ title: 'Noted' });
	}
});

router.get('/board', function(req, res) {
	res.render('board', { title: 'Board Name' });
	/*try {
		if (req.session.name) {
			res.render('board', { title: 'Board Name' });
		}
	}
	catch (err) {
		res.render('index',{ title: 'Noted' });
	}*/
});


module.exports = router;
