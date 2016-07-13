var MessageManager = require('../MessageManager');
var mm = new MessageManager();

var next = function(result) {
	console.log(result)
}

//mm.add.messageToBoard('577df3ef1ddf0de021169cda',"Meow", "Alex", next)
//mm.add.alertToUser('Alex','Hey',next);

//mm.remove.alert('Alex',9423608416225760,next)

//mm.get.alerts('Alex',next)
//mm.get.messages('577df3ef1ddf0de021169cda',next);