var Board = React.createClass({
	newNote : function(evt) {

		var x = evt.pageX - $('#boardSection').offset().left | 0;
		var y = evt.pageY - $('#boardSection').offset().top | 0;
		var boardID = this.state.boardID;
		var callingUser = this.state.user;
		var bgColor = this.state.noteColorPicker;
		var textColor = this.state.textColorPicker;
		var path = '/note?boardID='+boardID+'&callingUser='+callingUser+'&x='+x+'&y='+y+'&bgColor='+bgColor+'&textColor='+textColor
		var me = this;
		var handleResponse = function(value) {
			console.log(value)
			if (value) {
				me.setState({editingNote:value,mode:'editing'})
			}
			else {
				console.log(value)
			}	
		}
		var options = {
			methodType:'PUT',
			path:path,
			next: handleResponse
		}

		sendMessage(options)

	},
	save: function() {
		var me = this;
		var editingNote = this.state.editingNote;
		var noteID = editingNote._id;
  		var angle = editingNote.angle;
  		var contents = editingNote.content;
  		var bgcolor = editingNote.bgColor;
  		var textcolor = editingNote.textColor;
  		var style = $('#'+editingNote._id).prop('style')
		var x = style.left;
		var y = style.top;
  		var next = function(value) {
  			if (value.result === true) {
  				var notes = me.state.notes;
  				editingNote.state.mode='normal';
  				editingNote.state.editingUser='';
  				notes.push(editingNote)
  				me.setState({mode:'normal',editingNote:{},notes:notes})
  			}
  			else {
  				console.log(value)
  			}
  		}
  		var path = '/note?noteid='+noteID+'&angle='+angle+'&contents='+contents+'&bgcolor='+bgcolor+'&textcolor='+textcolor+'&x='+x+'&y='+y;
  		var options = {
  			path:path,
  			next:next,
  			methodType:'POST'
  		}
  		sendMessage(options);
  	
	},
	edit : function(id) {
		var me = this;
		var notes = this.state.notes;
		var editingNote;
		notes.map(function(note) {
			if (note._id === id) {
				editingNote=note;
			}
		})
  		var next = function(value) {
  			if (value.result === true) {
  				editingNote.state.editingUser=me.state.user;
  				editingNote.state.mode='editing'
  				me.setState({mode:'editing',editingNote:editingNote})
  			}
  		}
  		var path = '/note/editmode/enter?id=' + id;
  		var options = {
  			path: path,
  			methodType: 'POST',
  			next: next
  		}
  		sendMessage(options);

	},
	cancel : function() {
		var me = this;
  		var next = function(value) {
  			if (value.result === true) {
  				me.setState({mode:'normal',editingNote:{}})
  			}
  		}
  		var path = '/note/editmode/exit?id=' + me.state.editingNote._id;
  		var options = {
  			path: path,
  			methodType: 'POST',
  			next: next
  		}
  		sendMessage(options);
	},
	delete : function() {
		var me = this;
  		var next = function(value) {
  			if (value.result === true) {
  				me.setState({mode:'normal',editingNote:{}})
  			}
  		}
  		var path = '/note?id=' + me.state.editingNote._id;
  		var options = {
  			path: path,
  			methodType: 'DELETE',
  			next: next
  		}
  		sendMessage(options);
	},
	changeTextColor : function(context) {
		var color = context.target.id.replace('Text','');
		var editingNote = this.state.editingNote;
		if (editingNote._id) {
			var style = $('#'+editingNote._id).prop('style')
			var x = style.left;
			var y = style.top;
			var coordinates={x:x,y:y}
			editingNote.textColor=color;
			editingNote.coordinates=coordinates;
		}
		this.setState({textColorPicker:color,editingNote:editingNote});
	},
	changeNoteColor : function(context) {
		var color = context.target.id.replace('Note','');
		var editingNote = this.state.editingNote;
		if (editingNote._id) {
			var style = $('#'+editingNote._id).prop('style')
			var x = style.left;
			var y = style.top;
			var coordinates={x:x,y:y}
			editingNote.bgColor=color;
			editingNote.coordinates=coordinates;
		}
		this.setState({noteColorPicker:color,editingNote:editingNote});
	},
	changeEditingNote : function(newState) {
		var editingNote = this.state.editingNote;
		editingNote.content=newState.content;
		editingNote.coordinates=newState.coordinates;
		this.setState({editingNote:editingNote})
	},
	//------------------------------------------------------------------------------------------------------
	isUserEditing : function() {
		if (this.state.mode === 'editing') {
			return true;
		}
		else {
			return false;
		}
	},
	eachNote : function(note,i) {
		var me = this;
		if (note.state.mode === 'editing' && note.state.editingUser === this.state.user) {
			return null;
		}
		return (
			<Note 
				key={Math.random(0,9999) * 1000000 | 0}
				index={i}
				id={note._id}
				left={note.coordinates.x} 
				top={note.coordinates.y}
				bgColor={note.bgColor}
				textColor={note.textColor}
				angle={note.angle}
				mode={note.state.mode}
				type={note.state.type}
				editingUser={note.state.editingUser}
				owner={note.owner}
				setBoardToEdit={me.edit}
				isUserEditing={me.isUserEditing}
				content={note.content}
				user={me.state.user}
				changeEditingNote={me.changeEditingNote}
			></Note>
		)
	},
	getInitialState : function() {
		var id = window.location.pathname
			id = id.slice(id.lastIndexOf('/')+1)

		return {
			boardID:id,
			notes: [],
			toolStyle : {
				'width':'100%',
				'height': '100%',
				'backgroundColor' : '#9E9473'
			},
			boardStyle : {
				'height': '450px',
				'backgroundColor' : '#9E9473'
			},
			textColorPicker : 'black',
			noteColorPicker : 'yellow',
			mode : 'normal',
			editingNote : {},
			user: ''
		}
	},
	componentWillMount : function() {
		var me = this;

		var setUser = function(user) {
			me.setState({user:user.name})
		}
		var path = '/user/contextUser';
		var options = {
			methodType:'GET',
			path:path,
			next: setUser
		}
		sendMessage(options);
	},
	componentDidMount : function() {
		var me = this;
		setInterval(function() {
			var handleResponse = function(newNotes) {
				var note = me.state.editingNote
				
				if (note._id) {
					var style = $('#'+note._id).prop('style')
					var x = style.left;
					var y = style.top;

					note.coordinates={x:x,y:y}	
				}
				
				me.setState({notes:newNotes,editingNote:note})
			}
			var path = '/note?id=' + me.state.boardID;
			var options = {
				methodType:'GET',
				path:path,
				next: handleResponse
			}
			sendMessage(options);
		},4000);

	},

//----------------------------------------------------------------------------------------------------

	renderColorChanger : function() {
		return (
			<div>
				<div id='noteColor' className="col-xs-1 col-md-12 button-group colorPicker" role="group">
					<button id="btnGroupDrop1" style={{'backgroundColor':this.state.textColorPicker}} type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>	
					<div className="dropdown-menu colorOptions" aria-labelledby="btnGroupDrop1">
						<button id='redText' onClick={this.changeTextColor} style={{'backgroundColor': 'red'}} className="col-md-2 col-xs-2 dropdown-item btn"></button>
						<button id='orangeText' onClick={this.changeTextColor} style={{'backgroundColor': 'orange'}} className="col-md-2 col-xs-2 dropdown-item btn"></button>
						<button id='yellowText' onClick={this.changeTextColor} style={{'backgroundColor': 'yellow'}} className="col-md-2 col-xs-2 dropdown-item btn"></button>
						<button id='greenText' onClick={this.changeTextColor} style={{'backgroundColor': 'green'}} className="col-md-2 col-xs-2 dropdown-item btn"></button>
						<button id='blueText' onClick={this.changeTextColor} style={{'backgroundColor': 'blue'}} className="col-md-2 col-xs-2 dropdown-item btn"></button>
						<button id='blackText' onClick={this.changeTextColor} style={{'backgroundColor': 'black'}} className="col-md-2 col-xs-2 dropdown-item btn"></button>
					</div>
					<div>Text</div>
				</div>
				<div id='textColor' className="col-xs-1 col-md-12 button-group colorPicker" role="group">
					<button style={{'backgroundColor':this.state.noteColorPicker}} id="btnGroupDrop2" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>	
					<div className="dropdown-menu colorOptions" aria-labelledby="btnGroupDrop2">
						<button id='redNote' onClick={this.changeNoteColor} style={{'backgroundColor': 'red'}} className="col-md-2 col-xs-2 dropdown-item btn"></button>
						<button id='orangeNote' onClick={this.changeNoteColor} style={{'backgroundColor': 'orange'}} className="col-md-2 col-xs-2 dropdown-item btn"></button>
						<button id='yellowNote' onClick={this.changeNoteColor} style={{'backgroundColor': 'yellow'}} className="col-md-2 col-xs-2 dropdown-item btn"></button>
						<button id='greenNote' onClick={this.changeNoteColor} style={{'backgroundColor': 'green'}} className="col-md-2 col-xs-2 dropdown-item btn"></button>
						<button id='blueNote' onClick={this.changeNoteColor} style={{'backgroundColor': 'blue'}} className="col-md-2 col-xs-2 dropdown-item btn"></button>
						<button id='purpleNote' onClick={this.changeNoteColor} style={{'backgroundColor': 'purple'}} className="col-md-2 col-xs-2 dropdown-item btn"></button>
					</div>
					<div>Note</div>
				</div>
			</div>
			)
	},
	renderEditingNote : function() {
		var note = this.state.editingNote
		console.log(note._id)
		var me = this;
		var i = null;

		if (!note._id) {
			return null;
		}

		return (
			<Note 
				key={Math.random(0,9999) * 1000000 | 0}
				index={i}
				id={note._id}
				left={note.coordinates.x} 
				top={note.coordinates.y}
				bgColor={note.bgColor}
				textColor={note.textColor}
				angle={note.angle}
				mode={note.state.mode}
				type={note.state.type}
				editingUser={note.state.editingUser}
				owner={note.owner}
				setBoardToEdit={me.edit}
				isUserEditing={me.isUserEditing}
				content={note.content}
				user={me.state.user}
				changeEditingNote={me.changeEditingNote}
				editingNote={me.state.editingNote}
			></Note>
		)
	},
	renderNormal : function() {
		return (
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-md-1 col-xs-12'>
						<div style={this.state.toolStyle} className="input-group" role="group" aria-label="Basic example">
							<div style={{'visibility': 'hidden'}} id='slider' className='col-xs-3 col-md-12'>
								<input type="range" min='0' max='360'></input>
								<div>Angle</div>
							</div>
							{this.renderColorChanger()}
							<button style={{'visibility':'hidden'}} id='change' type="button" className="btn glyphicon glyphicon-chevron-right btn-secondary col-md-offset-0 col-md-12 col-xs-offset-1 col-xs-1"></button>
							<button style={{'visibility':'hidden'}} id='save' type="button" className="btn glyphicon glyphicon-ok btn-secondary col-xs-1 col-md-12"></button>
							<button style={{'visibility':'hidden'}} id='delete' type="button" className="btn glyphicon glyphicon-trash btn-secondary col-xs-1 col-md-12"></button>
							<button style={{'visibility':'hidden'}} id='cancel' type="button" className="btn glyphicon glyphicon-remove btn-secondary col-xs-1 col-md-12"></button>
							<button id='chat' type="button" className="btn glyphicon glyphicon-comment btn-secondary col-xs-1 col-md-12"></button>
						</div>
					</div>
					<div id='boardSection' onClick={this.newNote} className='col-lg-11 col-md-10 col-md-offset-1 col-lg-offset-0 col-xs-12' style={this.state.boardStyle}>
						{this.state.notes.map(this.eachNote)}
					</div>				
				</div>
			</div>
		)
	},
	renderEdit : function() {
		return (
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-md-1 col-xs-12'>
						<div style={this.state.toolStyle} className="input-group" role="group" aria-label="Basic example">
							<div id='slider' className='col-xs-3 col-md-12'>
								<input type="range" min='0' max='360'></input>
								<div>Angle</div>
							</div>
							{this.renderColorChanger()}
							<div className="button-group changePicker" role="group">
								<button id='change' type="button" className="btn glyphicon glyphicon-chevron-right btn btn-secondary dropdown-toggle col-md-offset-0 col-md-12 col-xs-offset-1 col-xs-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>	
								<div className="dropdown-menu changeOptions" aria-labelledby="change">
									<button style={{'marginTop':'0px'}} className="glyphicon glyphicon-pencil col-md-3 col-xs-3 dropdown-item btn"></button>
									<button style={{'marginTop':'0px'}} className="glyphicon glyphicon-facetime-video col-md-3 col-xs-3 dropdown-item btn"></button>
									<button style={{'marginTop':'0px'}} className="glyphicon glyphicon-picture col-md-3 col-xs-3 dropdown-item btn"></button>
									<button style={{'marginTop':'0px'}} className="glyphicon glyphicon-pushpin col-md-3 col-xs-3 dropdown-item btn"></button>
								</div>
							</div>
							<button onClick={this.save} id='save' type="button" className="btn glyphicon glyphicon-ok btn-secondary col-xs-1 col-md-12"></button>
							<button onClick={this.delete} id='delete' type="button" className="btn glyphicon glyphicon-trash btn-secondary col-xs-1 col-md-12"></button>
							<button onClick={this.cancel} id='cancel' type="button" className="btn glyphicon glyphicon-remove btn-secondary col-xs-1 col-md-12"></button>
							<button id='chat' type="button" className="btn glyphicon glyphicon-comment btn-secondary col-xs-1 col-md-12"></button>
						</div>
					</div>
					<div id='boardSection' className='col-lg-11 col-md-10 col-md-offset-1 col-lg-offset-0 col-xs-12' style={this.state.boardStyle}>
						{this.state.notes.map(this.eachNote)}
						{this.renderEditingNote()}
					</div>

				</div>
			</div>
		)
	},
	render : function() {
		if (this.state.mode === 'normal') {
			return this.renderNormal();
		}
		else if (this.state.mode === 'editing') {
			return this.renderEdit();	
		}
		else if (this.state.mode === 'messaging') {
			return this.renderMessage();
		}
		else {
			return (<div>Not in a valid mode</div>)
		}
	}
})

var Note = React.createClass({
	getInitialState : function() {
		return {
			style : {
				position: 'absolute',
				left: this.props.left,
				top: this.props.top,
				width: '125px',
				height: '125px',
				backgroundColor: this.props.bgColor,
				color: this.props.textColor
			},
			mode: this.props.mode,
			content: this.props.content
		}
	},
	componentDidMount : function() {
		if (this.props.mode === 'editing' && this.props.editingUser === this.props.user) {
			$('#'+this.props.id).draggable()
		}
		else {
			$('#'+this.props.id).draggable()
			$('#'+this.props.id).draggable('destroy')
		}
	},
	handleChange : function(event) {
		var style = $('#'+this.props.id).prop('style')
		var x = style.left;
		var y = style.top;
		var coordinates={x:x,y:y}
		this.props.changeEditingNote({content: event.target.value,coordinates:coordinates});

	},
	edit : function(event) {
		event.stopPropagation();
		if (!this.props.isUserEditing()) {
			this.props.setBoardToEdit(event.target.id)
		}
		
	},
	onFocus : function(event) {
		this.moveCaretToEnd(event.target);
	},
	moveCaretToEnd : function(el) {
	    if (typeof el.selectionStart == "number") {
	        el.selectionStart = el.selectionEnd = el.value.length;
	    } else if (typeof el.createTextRange != "undefined") {
	        el.focus();
	        var range = el.createTextRange();
	        range.collapse(false);
	        range.select();
	    }
	},
	//----------------------------------------------------------------------------------

	renderNormal : function() {
		return (
				<div  id={this.props.id} onClick={this.edit} className='note' style={this.state.style}><span>{this.state.content}</span></div>
			)
	},
	renderEditByUser : function() {
		return (
				<div id={this.props.id} className='note ui-widget-content' style={this.state.style}><textarea autoFocus onFocus={this.onFocus} onChange={this.handleChange} value={this.state.content}></textarea></div>
			)		
	},
	renderEditByOther : function() {
		return (
			<div id={this.props.id} className='note editByOther' style={this.state.style}><span>{this.state.content}</span></div>
		)		
	},
	render : function() {
		if (this.props.mode === 'normal') {
			return this.renderNormal();
		}
		else if (this.props.mode === 'editing' && this.props.editingUser === this.props.user) {
			return this.renderEditByUser();
		}
		else {
			return this.renderEditByOther()
		}
	}
})


ReactDOM.render(<Board />, document.getElementById('board'))