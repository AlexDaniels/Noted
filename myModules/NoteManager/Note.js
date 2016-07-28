var Note = function(args) {
	args = args || {};
	this.boardID = args.boardID;
	this.content = '';
	this.coordinates = args.coordinates;
	this.bgColor = args.bgColor;
	this.textColor = args.textColor;
	this.angle = 0;
	this.state = {mode:'editing',type:'text',editingUser:args.owner}
	this.owner = args.owner;
}

module.exports = Note;