var express = require('express');
var router = express.Router();
var UserManager = require('../myModules/UserManager');
var SecurityManager = new require('../myModules/SecurityManager');


/* GET user methods. */
router.get('/', function(req, res) {

});
router.get('/people', function(req, res) {
	res.json({'Result':'Unimplemented'});
});
router.get('/contextuser', function(req, res) {
	res.json({'name':req.session.name});
});
router.get('/isSubscribed', function(req, res) {
	var id = req.query.id;
	var username = req.session.name
	var next = function(user) {
		console.log(user)
		var value = false;
		var boards = user.boardsSubscribed;
		boards.map(function(board){
			if (board == id) {
				value=true;
			}
		})
		res.json({result:value})
	}
	var um = new UserManager()
	um.get.user(username,next)
});


/* PUT user methods. */
router.put('/', function(req, res) {
	var username = req.query.username;
	var email = req.query.email;
	var hashPassword = req.query.password
	var next2 = function(value) {
		res.json(value);
	}
	var next = function(value) {
		console.log('x')
		if (value.result === true) {
			var sm = new SecurityManager()
			sm.session.login(username,hashPassword,req,next2)
		}
		else {
			res.json(value)
		}
	}
	var um = new UserManager();
	um.add.newUser(username,hashPassword,email,next)
});
router.put('/subscribed', function(req, res) {
	var username = req.session.name;
	var id = req.query.id;
	var next = function(value) {
		res.json(value)
	}
	var um = new UserManager();
	um.add.boardToSubscribedList(username, id,next);
});
router.put('/owner', function(req, res) {
	res.json({'Result':'Unimplemented'});
});
router.put('/people', function(req, res) {
	res.json({'Result':'Unimplemented'});
});


/* POST user methods. */
router.post('/username', function(req, res) {
	res.json({'Result':'Unimplemented'});
});
router.post('/password', function(req, res) {
	res.json({'Result':'Unimplemented'});
});
router.post('/email', function(req, res) {
	res.json({'Result':'Unimplemented'});
});


/* DELETE user methods. */
router.delete('/', function(req, res) {
	res.json({'Result':'Unimplemented'});
});
router.delete('/subscribed', function(req, res) {
	res.json({'Result':'Unimplemented'});
});
router.delete('/owner', function(req, res) {
	res.json({'Result':'Unimplemented'});
});
router.delete('/people', function(req, res) {
	res.json({'Result':'Unimplemented'});
});

module.exports = router;