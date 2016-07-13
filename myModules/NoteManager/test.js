var NoteManager = require('../NoteManager');
var nm = new NoteManager();

var next = function(result) {
	console.log(result);
}

//nm.add.note('577df3ef1ddf0de021169cda', "Alex", "New Note", {x:100,y:100}, "red",'blue', next);

//nm.change.note('577eb41d9afebdf4132e3320',30,"time","tellow",'black',{x:20,y:40},next);

//nm.remove.note('577e92019ad198995904f5af',next)

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

nm.get.notes('577df3ef1ddf0de021169cda', next)