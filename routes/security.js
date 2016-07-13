var express = require('express');
var router = express.Router();
var SecurityManager = require('../myModules/SecurityManager');

router.post('/login', function(req, res) {
	var sm = new SecurityManager();
	if (sm.isUserAuthenticated) {
		res.json({result:"Already Logged In"})
	}
	else {
		var username = req.query.username
		var password = req.query.password
		var next = function(val) {
			if (val.result === true) {
				//Render logged in homepage
			}
			else {
				//Return Incorrect Username or password
			}
		}

		sm.login(username,password,req,next)
	}
});
router.post('/logout', function(req, res) {
	var sm = new SecurityManager()
	sm.logout(req);
	//Render index
});

module.exports = router;