var Board = React.createClass({
	changeTextColor : function(context) {
		var color = context.target.id.replace('Text','');
		this.setState({textColorPicker:color});
	},
	changeNoteColor : function(context) {
		var color = context.target.id.replace('Note','');
		this.setState({noteColorPicker:color});
	},
	eachNote : function(note,i) {
		return (
			<Note 
				key={note.boardID}
				id={i}
				left={note.coordinates.x} 
				top={note.coordinates.y}
				bgColor={note.bgColor}
				textColor={note.textColor}
				angle={note.angle}
				mode={note.state.mode}
				type={note.state.type}
				editingUser={note.state.editingUser}
				owner={note.owner}
			>{note.content}</Note>
		)
	},
	getInitialState : function() {
		var note1 = {
			'boardID':'1024010',
			'content':'Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World',
			'coordinates':{x:0,y:0},
			'bgColor':'lightblue',
			'textColor':'black',
			'angle':0,
			'state':{'mode':'normal','type':'text','editingUser':''},
			'owner':'Alex'
		}

		var note2 = {
			'boardID':'1001032',
			'content':'Hello 324World',
			'coordinates':{x:400,y:100},
			'bgColor':'lightblue',
			'textColor':'black',
			'angle':0,
			'state':{'mode':'normal','type':'text','editingUser':''},
			'owner':'Alex'
		}

		var note3 = {
			'boardID':'1001023',
			'content':'Hello fdsaWorld',
			'coordinates':{x:100,y:100},
			'bgColor':'lightblue',
			'textColor':'black',
			'angle':0,
			'state':{'mode':'normal','type':'text','editingUser':''},
			'owner':'Alex'
		}

		var note4 = {
			'boardID':'100fdsa105',
			'content':'Hello World',
			'coordinates':{x:600,y:100},
			'bgColor':'lightblue',
			'textColor':'black',
			'angle':0,
			'state':{'mode':'normal','type':'text','editingUser':''},
			'owner':'Alex'
		}

		return {
			notes: [note1,note2,note3,note4],
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
			mode : 'normal'
		}
	},
	componentDidMount : function() {
		var me = this;
		setTimeout(function() {
			me.setState({mode:'editing'})
		},1000)
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
							
							<div id='noteColor' className="col-xs-1 col-md-12 button-group colorPicker" role="group">
								<button id="btnGroupDrop1" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>	
								<div className="dropdown-menu colorOptions" aria-labelledby="btnGroupDrop1">
									<button className="col-md-2 col-xs-2 dropdown-item btn"></button>
									<button className="col-md-2 col-xs-2 dropdown-item btn"></button>
									<button className="col-md-2 col-xs-2 dropdown-item btn"></button>
									<button className="col-md-2 col-xs-2 dropdown-item btn"></button>
									<button className="col-md-2 col-xs-2 dropdown-item btn"></button>
									<button className="col-md-2 col-xs-2 dropdown-item btn"></button>

								</div>
								<div>Note</div>
							</div>
							<div id='noteColor' className="col-xs-1 col-md-12 button-group colorPicker" role="group">
								<button id="btnGroupDrop2" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>	
								<div className="dropdown-menu colorOptions" aria-labelledby="btnGroupDrop2">
									<button className="col-md-2 col-xs-2 dropdown-item btn"></button>
									<button className="col-md-2 col-xs-2 dropdown-item btn"></button>
									<button className="col-md-2 col-xs-2 dropdown-item btn"></button>
									<button className="col-md-2 col-xs-2 dropdown-item btn"></button>
									<button className="col-md-2 col-xs-2 dropdown-item btn"></button>
									<button className="col-md-2 col-xs-2 dropdown-item btn"></button>

								</div>
								<div>Text</div>
							</div>
							<button style={{'visibility':'hidden'}} id='change' type="button" className="btn glyphicon glyphicon-chevron-right btn-secondary col-md-offset-0 col-md-12 col-xs-offset-1 col-xs-1"></button>
							<button style={{'visibility':'hidden'}} id='save' type="button" className="btn glyphicon glyphicon-ok btn-secondary col-xs-1 col-md-12"></button>
							<button style={{'visibility':'hidden'}} id='delete' type="button" className="btn glyphicon glyphicon-trash btn-secondary col-xs-1 col-md-12"></button>
							<button style={{'visibility':'hidden'}} id='cancel' type="button" className="btn glyphicon glyphicon-remove btn-secondary col-xs-1 col-md-12"></button>
							<button id='chat' type="button" className="btn glyphicon glyphicon-comment btn-secondary col-xs-1 col-md-12"></button>
						</div>
					</div>
					<div className='col-lg-11 col-md-10 col-md-offset-1 col-lg-offset-0 col-xs-12' style={this.state.boardStyle}></div>
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
									<button id='redNote' onClick={this.changeNoteColor} style={{'backgroundColor': 'red'}} onClick={this.changeColor} className="col-md-2 col-xs-2 dropdown-item btn"></button>
									<button id='orangeNote' onClick={this.changeNoteColor} style={{'backgroundColor': 'orange'}} className="col-md-2 col-xs-2 dropdown-item btn"></button>
									<button id='yellowNote' onClick={this.changeNoteColor} style={{'backgroundColor': 'yellow'}} className="col-md-2 col-xs-2 dropdown-item btn"></button>
									<button id='greenNote' onClick={this.changeNoteColor} style={{'backgroundColor': 'green'}} className="col-md-2 col-xs-2 dropdown-item btn"></button>
									<button id='blueNote' onClick={this.changeNoteColor} style={{'backgroundColor': 'blue'}} className="col-md-2 col-xs-2 dropdown-item btn"></button>
									<button id='purpleNote' onClick={this.changeNoteColor} style={{'backgroundColor': 'purple'}} className="col-md-2 col-xs-2 dropdown-item btn"></button>
								</div>
								<div>Note</div>
							</div>
							<div className="button-group changePicker" role="group">
								<button id='change' type="button" className="btn glyphicon glyphicon-chevron-right btn btn-secondary dropdown-toggle col-md-offset-0 col-md-12 col-xs-offset-1 col-xs-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>	
								<div className="dropdown-menu changeOptions" aria-labelledby="change">
									<button style={{'marginTop':'0px'}} className="glyphicon glyphicon-pencil col-md-3 col-xs-3 dropdown-item btn"></button>
									<button style={{'marginTop':'0px'}} className="glyphicon glyphicon-facetime-video col-md-3 col-xs-3 dropdown-item btn"></button>
									<button style={{'marginTop':'0px'}} className="glyphicon glyphicon-picture col-md-3 col-xs-3 dropdown-item btn"></button>
									<button style={{'marginTop':'0px'}} className="glyphicon glyphicon-pushpin col-md-3 col-xs-3 dropdown-item btn"></button>
								</div>
							</div>
							<button id='save' type="button" className="btn glyphicon glyphicon-ok btn-secondary col-xs-1 col-md-12"></button>
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

			}
		}
	},
	remove : function() {

	},
	save : function() {

	},
	edit : function() {

	},
	renderNormal : function() {

	},
	renderEdit : function() {

	},
	render : function() {
		return (
			<div className='note' style={this.state.style}><span>{this.props.children}</span></div>
		)
	}
})

ReactDOM.render(<Board />, document.getElementById('board'))