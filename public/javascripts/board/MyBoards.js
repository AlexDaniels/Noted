var MyBoards = React.createClass({
	getInitialState : function() {
		return {
			boards : [{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'}]
		}
	},
	getMyBoards : function() {
		
	},
	eachBoard : function(board,i) {
		return (
			<MyBoard
			name={board.name}
			index={i}
			key={i}
			description={board.description}
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
	render: function() {
		return (
			<div className='row myboards' >
				<h3 className='col-xs-8'>{this.props.name}</h3>
				<button className='btn col-xs-3 col-xs-offset-1'>Open</button>
				<p className='col-xs-12'>{this.props.description}</p>
			</div>
		)
	}
});

ReactDOM.render(<MyBoards></MyBoards>, document.getElementById('myBoardsComponent'))