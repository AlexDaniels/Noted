var Message = function(args) {
	args = args || {};
	this.user = args.user;
	this.contents = args.contents;
	this.time = new Date().toDateString();
}

module.exports = Message;