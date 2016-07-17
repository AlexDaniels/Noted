var MySubs = React.createClass({
	getInitialState : function() {
		return {
			boards : [{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'}]
		}
	},
	getMyBoards : function() {
		
	},
	eachSub : function(board,i) {
		return (
			<MySub
			name={board.name}
			index={i}
			key={i}
			description={board.description}
			>
			</MySub>
		)
	},
	render : function() {
		return (
				<div>
					{this.state.boards.map(this.eachSub)}
				</div>
			)
	}
})

var MySub = React.createClass({
	render: function() {
		return (
			<div className='row myboards' >
				<h3 className='col-xs-8 col-xs-'>{this.props.name}</h3>
				<button className='btn col-xs-3 col-xs-offset-1'>Open</button>
				<p className='col-xs-12'>{this.props.description}</p>
			</div>
		)
	}
});

ReactDOM.render(<MySubs></MySubs>, document.getElementById('mySubsComponent'))