var xhttp = new XMLHttpRequest()
var signUpBtn = $('#'+'signupbtn');

signUpBtn.on('click', function(){
	var usernameEl = document.getElementById('newUsername')
	var username = usernameEl.value
	var passwordEl = document.getElementById('newPassword')
	var password = passwordEl.value;
	var email = document.getElementById('newEmail').value
	var path = 'http://localhost:3000/user?username='+username+'&password='+password+'&email='+email
	var next = function(value) {
		console.log(value)
		if (value.result === true) {
			window.location='/home'
		}
		else {
			usernameEl.style.borderColor = "red";
			usernameEl.style.backgroundColor = "Tomato";
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
	var usernameEl = document.getElementById('loginUser')
	var username = usernameEl.value
	var passwordEl = document.getElementById('loginPass')
	var password = passwordEl.value;
	var path = 'http://localhost:3000/security/login?username='+username+'&password='+password
	var next = function(value) {
		if (value.result === true) {
			window.location='/home'
		}
		else {
			if (value.result === 'falseuser') {
				usernameEl.style.borderColor = "red";
				usernameEl.style.backgroundColor = "Tomato";
			}
			else if(value.result === 'falsepassword') {
				usernameEl.style.borderColor = "white";
				usernameEl.style.backgroundColor = "white";
				passwordEl.style.borderColor = "red";
				passwordEl.style.backgroundColor = "Tomato";
			}
		}
	}
	var options = {
		methodType:'POST',
		path:path,
		next: next
	}
	sendMessage(options)
})