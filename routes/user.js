var express = require('express');
var router = express.Router();
var UserManager = require('../myModules/UserManager');
var sm = new require('../myModules/SecurityManager');


/* GET user methods. */
router.get('/', function(req, res) {
	
});
router.get('/people', function(req, res) {
	res.json({'Result':'Unimplemented'});
});


/* PUT user methods. */
router.put('/', function(req, res) {
	res.json({'Result':'Unimplemented'});
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