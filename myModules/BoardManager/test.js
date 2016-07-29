var BoardManager = require('../BoardManager');
var bm = new BoardManager();

var next = function(result) {
	console.log(result)
}

//bm.add.newBoard('Cool Board','Day Love',['Keyword'],'Truck Dog',next)
//bm.add.newBoard('Lame Board','Night Hate',['Keyword'],'Car Cat',next)

//bm.change.name("577e8ee03de10b5656b0f829","New Cool Board Name",next)
//bm.change.category("577e8ee03de10b5656b0f829","New Category",next)
//bm.change.keywords("577e8ee03de10b5656b0f829",['bit','strip'],next)

//bm.get.boardListByCategory('Category',next)
//bm.get.boardListByKeywords('strip',next)
//bm.get.board("577e8ee03de10b5656b0f829",next);

bm.get.setup();

//bm.remove.board("577e8ee03de10b5656b0f829",next)
//bm.get.search("Truck Car",next)
//bm.get.board("577e8ee03de10b5656b0f829",next);