var sendMessage = function(options) {
	var xhttp = new XMLHttpRequest()
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var value = xhttp.responseText;
			options.next(JSON.parse(value))
		}
	}
	xhttp.open(options.methodType,options.path,true)
	xhttp.send();
}	