var Alert = function(args) {
	args = args || {};
	this.id = Math.floor(1000000000000000 + Math.random() * 9000000000000000);
	this.contents = args.contents;
	this.date = new Date().toDateString();
}

module.exports = Alert;