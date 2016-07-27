var Board = React.createClass({
	newNote : function(evt) {

		var x = evt.pageX - $('#boardSection').offset().left | 0;
		var y = evt.pageY - $('#boardSection').offset().top | 0;

		

		var me = this;

		var handleNewNoteResponse = function(note) {
			var newNotes = me.state.notes;
			newNotes.push(note);
			me.setState({notes:newNotes,mode:note.state.mode})
		}
		var note = {
			'key':Math.random(0,9999) * 1000000 | 0,
			'id':Math.random(0,9999) * 1000000 | 0,
			'coordinates':{x:x,y:y},
			'bgColor':me.state.noteColorPicker,
			'textColor':me.state.textColorPicker,
			'angle':0,
			'state':{'mode':'editing','type':'text','editingUser':me.state.user},
			'owner':'unimplemented',
			'content':''
		}

		handleNewNoteResponse(note)
	},
	edit : function(id) {
		var newNotes = this.state.notes;
		var note = newNotes.find(function(note) {	
			if (note.id == id) {
				return true;
			}
			else {
				return false;
			}
		});
		note.state.mode='editing';
		this.setState({notes:newNotes,mode:'editing'});

	},
	save: function() {
		var newNotes = this.state.notes;
		var me = this;
		var callback = function(note) {
			if (note.state.editingUser === me.state.user) {
				note.state.mode='normal';
				console.log(note)
			}
		}
		newNotes.forEach(callback)
		me.setState({mode:'normal',notes:newNotes});
	},
	changeTextColor : function(context) {
		var color = context.target.id.replace('Text','');
		this.setState({textColorPicker:color});
	},
	changeNoteColor : function(context) {
		var color = context.target.id.replace('Note','');
		this.setState({noteColorPicker:color});
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
		return (
			<Note 
				key={note.key}
				index={i}
				id={note.id}
				left={note.coordinates.x} 
				top={note.coordinates.y}
				bgColor={note.bgColor}
				textColor={note.textColor}
				angle={note.angle}
				mode={note.state.mode}
				type={note.state.type}
				editingUser={note.state.editingUser}
				owner={note.owner}
				setBoardToEdit={this.edit}
				isUserEditing={this.isUserEditing}
				content={note.content}
				user={this.state.user}
			></Note>
		)
	},
	getInitialState : function() {

		return {
			boardID:'',
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
		var setEnvironment = function(board) {
			me.setState({boardID:board.id,notes:board.notes,user:board.user})
		}

		

		var board = {
			id:'23424242',
			notes:[],
			user:'Alex'
		}

		setEnvironment(board);
	},
	componentDidMount : function() {
		var me = this;
		setInterval(function() {
			var newNotes = me.state.notes;
			for (var i = 0; i< newNotes.length; i++) {
				var note = newNotes[i];
				if (note.state.mode !== 'editing') {
					note.content='Nothing'
					note.key=Math.random(0,9999) * 1000000 | 0
				}
			}
			me.setState({notes:newNotes})
			},3000)
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
	renderMessage : function() {

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
							<button id='delete' type="button" className="btn glyphicon glyphicon-trash btn-secondary col-xs-1 col-md-12"></button>
							<button id='cancel' type="button" className="btn glyphicon glyphicon-remove btn-secondary col-xs-1 col-md-12"></button>
							<button id='chat' type="button" className="btn glyphicon glyphicon-comment btn-secondary col-xs-1 col-md-12"></button>
						</div>
					</div>
					<div id='boardSection' className='col-lg-11 col-md-10 col-md-offset-1 col-lg-offset-0 col-xs-12' style={this.state.boardStyle}>
						{this.state.notes.map(this.eachNote)}
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
			mode: 'normal',
			content: this.props.content,
		}
	},
	handleChange : function(event) {
		this.setState({content: event.target.value});
	},
	edit : function(event) {
		event.stopPropagation();
		if (!this.props.isUserEditing()) {
			this.props.setBoardToEdit(event.target.id)
		}
		
	},
	componentDidUpdate : function() {
		console.log(this.props.mode,this.props.editingUser,this.props.user)
		if (this.props.mode === 'editing' && this.props.editingUser === this.props.user) {
			$('#'+this.props.id).draggable()
		}
		else {
			$('#'+this.props.id).draggable()
			$('#'+this.props.id).draggable('destroy')
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
				<div id={this.props.id} className='note ui-widget-content' style={this.state.style}><textarea onChange={this.handleChange} value={this.state.content}></textarea></div>
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