var MyBoards = React.createClass({
	getInitialState : function() {
		return {
			boards : []
		}
	},
	componentDidMount : function() {
		this.getMyBoards();
	},
	getMyBoards : function() {
		var me = this;
		var path = 'http://localhost:3000/board/myboards'
		var next = function(value) {
			me.setState({boards:value})
		}
		var options = {
			methodType:'GET',
			path:path,
			next: next
		}
		sendMessage(options)
	},
	eachBoard : function(board,i) {
		return (
			<MyBoard
			name={board.name}
			index={i}
			key={i}
			description={board.description}
			id={board._id}
			>
			</MyBoard>
		)
	},
	render : function() {
		return (
				<div>
					{this.state.boards.map(this.eachBoard)}
				</div>
			)
	}
})

var MyBoard = React.createClass({
	goToBoard : function(event) {
		var id = event.target.id;
		window.location = '/board/editor/' + id
	},
	render: function() {
		return (
			<div className='row myboards' >
				<h3 className='col-xs-8'>{this.props.name}</h3>
				<button id={this.props.id} onClick={this.goToBoard} className='btn col-xs-3 col-xs-offset-1'>Open</button>
				<p className='col-xs-12'>{this.props.description}</p>
			</div>
		)
	}
});

ReactDOM.render(<MyBoards></MyBoards>, document.getElementById('myBoardsComponent'))