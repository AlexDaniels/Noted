var Board = React.createClass({
	getInitialState : function() {
		return {
			toolStyle : {
				width:'100%',
				height: '100%',
				'backgroundColor' : '#9E9473'
			},
			boardStyle : {
				height: '450px',
				'backgroundColor' : '#9E9473'
			},
			mode : 'normal'
		}
	},
	componentDidMount : function() {
		
		var me = this;
		setTimeout(function() {
			me.setState({mode:'editing'})
		},3000)

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
							<div className="button-group changePicker" role="group">
								<button id='change' type="button" className="btn glyphicon glyphicon-chevron-right btn btn-secondary dropdown-toggle col-md-offset-0 col-md-12 col-xs-offset-1 col-xs-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>	
								<div className="dropdown-menu changeOptions" aria-labelledby="change">
									<button style={{'margin-top':'0px'}} className="glyphicon glyphicon-pencil col-md-3 col-xs-3 dropdown-item btn"></button>
									<button style={{'margin-top':'0px'}} className="glyphicon glyphicon-facetime-video col-md-3 col-xs-3 dropdown-item btn"></button>
									<button style={{'margin-top':'0px'}} className="glyphicon glyphicon-picture col-md-3 col-xs-3 dropdown-item btn"></button>
									<button style={{'margin-top':'0px'}} className="glyphicon glyphicon-pushpin col-md-3 col-xs-3 dropdown-item btn"></button>
								</div>
							</div>
							<button id='save' type="button" className="btn glyphicon glyphicon-ok btn-secondary col-xs-1 col-md-12"></button>
							<button id='delete' type="button" className="btn glyphicon glyphicon-trash btn-secondary col-xs-1 col-md-12"></button>
							<button id='cancel' type="button" className="btn glyphicon glyphicon-remove btn-secondary col-xs-1 col-md-12"></button>
							<button id='chat' type="button" className="btn glyphicon glyphicon-comment btn-secondary col-xs-1 col-md-12"></button>
						</div>
					</div>
					<div className='col-lg-11 col-md-10 col-md-offset-1 col-lg-offset-0 col-xs-12' style={this.state.boardStyle}></div>
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

ReactDOM.render(<Board />, document.getElementById('board'))

var Note = React.createClass({
	getInitialState : function() {

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

	}
})