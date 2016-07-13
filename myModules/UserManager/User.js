var User = function(args) {
	args = args || {};
	this.username = args.username;
	this.password = args.password;
	this.email = args.email;
	this.boardsOwned = args.boardsOwnded;
	this.boardsSubscribed = args.boardsSubsribed;
	this.alerts = args.alerts;
	this.people = args.people;
}

module.exports = User;