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


/* PUT user methods. */
router.put('/', function(req, res) {
	var username = req.query.username;
	var email = req.query.email;
	var hashPassword = req.query.password
	var next2 = function(value) {
		if (value.result === true) {
			res.json(value);
		}
	}
	var next = function(value) {
		console.log('1')
		if (value.result === true) {
			console.log('2')
			var sm = new SecurityManager()
			sm.session.login(username,hashPassword,req,next2)
		}
		else {
			console.log('3')
			res.json(value)
		}
	}
	var um = new UserManager();
	um.add.newUser(username,hashPassword,email,next)
});
router.put('/subscribed', function(req, res) {
	res.json({'Result':'Unimplemented'});
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