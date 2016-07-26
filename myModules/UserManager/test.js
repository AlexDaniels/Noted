var UserManager = require('../UserManager');

next = function(result) {
	console.log(result);
}

var um = new UserManager();

//um.remove.user('Alex',next)

//um.add.newUser("Alex","100247245",'alex@gmail.com',next);
//um.add.boardToOwnerList("Alex",'5796d607d4526b541db67a17',next);
//um.add.boardToSubscribedList("Alex",123123,next);
//um.add.userToPeople("Alex","OtherGuy",next)

//um.change.username("Alex","Shmalex",next)
//um.change.password("Shmalex","100",next)
//um.change.email("Shmalex","email@email.com",next)
//um.change.username("Shmalex","Alex",next)

//um.remove.boardFromOwnerList('Alex',123123,next)
//um.remove.boardFromSubscribedList('Alex',123123,next);
//um.remove.userFromPeople('Alex','OtherGuy',next);
//um.remove.user("",next)

um.get.user('Alex',next);
//um.get.usersPeople('Alex',next);

