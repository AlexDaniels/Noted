var xhttp = new XMLHttpRequest()
var signUpBtn = $('#'+'signupbtn');

signUpBtn.on('click', function(){
	var username = document.getElementById('newUsername').value
	var password = document.getElementById('newPassword').value;
	var email = document.getElementById('newEmail').value
	var path = 'http://localhost:3000/user?username='+username+'&password='+password+'&email='+email
	var next = function(value) {
		console.log(typeof value )
		if (value.result === true) {
			window.location='/home'
		}
		else {
			//Display Error
		}
	}
	var options = {
		methodType:'PUT',
		path:path,
		next: next
	}
	sendMessage(options)
})

var loginBtn = $('#'+'loginbtn');

loginBtn.on('click', function(){
	var username = document.getElementById('loginUser').value
	var password = document.getElementById('loginPass').value;
	var path = 'http://localhost:3000/security/login?username='+username+'&password='+password
	var next = function(value) {
		console.log(typeof value )
		if (value.result === true) {
			window.location='/home'
		}
		else {
			//Display Error
			console.log(value)
		}
	}
	var options = {
		methodType:'POST',
		path:path,
		next: next
	}
	sendMessage(options)
})