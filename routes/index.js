var express = require('express');
var router = express.Router();
var mongo = require('mongodb');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Noted' });
 /* try {
		if (req.session.name) {
			res.render('home', { title: 'Username' });
		}
	}
	catch (err) {
		res.render('index',{ title: 'Noted' });
	} */
});
router.get('/home', function(req, res) {
	res.render('home', { title: 'Username' });
	/*try {
		if (req.session.name) {
			res.render('home', { title: 'Username' });
		}
	}
	catch (err) {
		res.render('index',{ title: 'Noted' });
	}*/
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
