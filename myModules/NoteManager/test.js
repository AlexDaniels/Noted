var NoteManager = require('../NoteManager');
var nm = new NoteManager();

var next = function(result) {
	console.log(result);
}

//nm.add.note('5798240dc70758366ca115a8', "Alex", "New Note", {x:400,y:400}, "red",'black', next);

//nm.change.note('577eb41d9afebdf4132e3320',30,"time","tellow",'black',{x:20,y:40},next);

nm.remove.note('57997111a1a94b6da2cdb6e0',next)



//nm.change.angle('577e91f87aceb58b59b8cc59',100,next)
//nm.change.contents('577e91f87aceb58b59b8cc59',"New Contents",next)
//nm.change.bgColor('577e91f87aceb58b59b8cc59',"Pinkless",next)
//nm.change.textColor('577e91f87aceb58b59b8cc59',"Redless",next)
//nm.change.coordinates('577e91f87aceb58b59b8cc59',{x:0,y:0},next)

//nm.change.modeToEdit('577eb41d9afebdf4132e3320','Time',next)
//nm.change.modeToNormal('577eb41d9afebdf4132e3320',next)

//nm.change.into.subBoard('577eb41d9afebdf4132e3320',next)
//nm.change.into.image('577eb41d9afebdf4132e3320',next)
//nm.change.into.video('577eb41d9afebdf4132e3320',next)

nm.get.notes('5798240dc70758366ca115a8', next)
