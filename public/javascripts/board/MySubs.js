var MySubs = React.createClass({
	getInitialState : function() {
		return {
			boards : [{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'}]
		}
	},
	componentDidMount : function() {
		
		this.getMySubs();
	},
	getMySubs : function() {
		
		var me = this;
		var path = 'http://localhost:3000/board/mysubs'
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
	eachSub : function(board,i) {
		return (
			<MySub
			name={board.name}
			index={i}
			key={i}
			id={board._id}
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
	goToBoard : function(event) {
		var id = event.target.id;
		window.location = '/board/editor/' + id
	},
	render: function() {
		return (
			<div className='row myboards' >
				<h3 className='col-xs-8 col-xs-'>{this.props.name}</h3>
				<button id={this.props.id} onClick={this.goToBoard} className='btn col-xs-3 col-xs-offset-1'>Open</button>
				<p className='col-xs-12'>{this.props.description}</p>
			</div>
		)
	}
});

ReactDOM.render(<MySubs></MySubs>, document.getElementById('mySubsComponent'))