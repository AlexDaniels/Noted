var express = require('express');
var router = express.Router();
var SecurityManager = require('../myModules/SecurityManager');

router.post('/login', function(req, res) {
	var sm = new SecurityManager();
	if (sm.session.isUserAuthenticated(req)) {
		res.render('home')
	}
	else {
		var username = req.query.username
		var password = req.query.password
		var next = function(val) {
			res.json(val)
		}

		sm.session.login(username,password,req,next)
	}
});
router.post('/logout', function(req, res) {
	var sm = new SecurityManager()
	sm.session.logout(req);
	console.log('Meow:'+req.session)
	res.json({result:true})
});

module.exports = router;