var Board = function(args) {
	args = args || {};
	this.name = args.name;
	this.category = args.category;
	this.state = args.state;
	this.messages = args.messages;
	this.notes = args.notes;
	this.keywords = args.keywords;
}

module.exports = Board;