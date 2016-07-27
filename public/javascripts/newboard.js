var createBtn = $('#'+'createbtn');

createBtn.on('click', function(){
	var title = document.getElementById('newTitle').value
	var category = document.getElementById('newCategory').value;
	var description = document.getElementById('newDescription').value

	var path = 'http://localhost:3000/board?title='+title+'&category='+category+'&description='+description
	var next = function(value) {
		console.log(typeof value )
		if (value.result === true) {
			window.location='/home'
		}
		else {
			console.log(value)
		}
	}
	var options = {
		methodType:'PUT',
		path:path,
		next: next
	}
	sendMessage(options)
})