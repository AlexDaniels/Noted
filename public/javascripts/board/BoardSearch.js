	var BoardSearch = React.createClass({
	getInitialState : function() {
		return {
			results: [],
			style : {
				'borderRadius': '10px',
				'backgroundColor': '#004466',
				'borderRadius': '10px',
				'borderStyle': 'solid',
				'borderColor': 'black',
				'marginBottom': '30px',
				'marginTop' : '20px',
				'height':'110px'
			}
		}
	},
	search : function(event) {
		var me = this;
		var search = $('#searchInput')[0].value
		var next = function(results) {
			me.setState({
				style : {
					'borderRadius': '10px',
					'backgroundColor': '#004466',
					'borderRadius': '10px',
					'borderStyle': 'solid',
					'borderColor': 'black',
					'marginBottom': '35px',
					'marginTop' : '20px',
					'height':'400px',
					'overflowY': 'scroll',
					'overflowX': 'hidden'
				},
				results : results,
				key : Math.random(0,9999) * 1000000 | 0
			});
		}
		var path = 'http://localhost:3000/board/search?search='+search
		var options = {
			methodType:'GET',
			path:path,
			next: next
		}
		sendMessage(options)

	},
	eachResult : function(result, i) {
		return (
			<BoardResult 
			name={result.name}
			index={i}
			key={i}
			id={result._id}
			description={result.description}
			>
			</BoardResult>
		)
	},
	render : function() {
		
		return (
				<div id='search' className='searcher' overflowY='scroll' style={this.state.style}	>
					<input id='searchInput' type='text' className='col-sm-6 col-sm-offset-1 col-xs-12 searchInput' placeholder='Board Name or Keyword' ></input>
					<button className='btn btn-lg col-sm-3 col-sm-offset-1 col-xs-12 searchButton' onClick={this.search}>Search</button>
					<br />
					<br />
					<br />
					<br />
					<div className='container'>
							{this.state.results.map(this.eachResult)}
					</div>
				</div>
		)
	}
});

var BoardResult = React.createClass({
	getInitialState : function() {
		return {
			subscribed: false
		}
	},
	isSubscribed : function() {
		var id = this.props.id;
		var me = this;
		var path = '/user/isSubscribed?id='+id
		var handleResponse = function(value) {
			console.log(value)
			if (value.result === true) {
				me.setState({subscribed:true})
			}
			else {
				me.setState({subscribed:false})
			}	
		}
		var options = {
			methodType:'GET',
			path:path,
			next: handleResponse
		}
		sendMessage(options)
	},
	open : function(event) {
		var id = this.props.id;
		window.location = '/board/editor/' + id
	},
	subscribe : function() {
		var id = this.props.id;
		
		var me = this;
		var path = '/user/subscribed?id='+id
		var handleResponse = function(value) {
			console.log(value)
			if (value.result === true) {
				me.setState({subscribed:true})
			}	
		}
		var options = {
			methodType:'PUT',
			path:path,
			next: handleResponse
		}
		sendMessage(options)
	},
	render: function() {
		this.isSubscribed();
		if (this.state.subscribed === false) {
			return (
				<div className='result row' >
					<h3 className='col-sm-2'>{this.props.name}</h3>
					<p className='col-sm-4'>{this.props.description}</p>
					<button onClick={this.open} className='col-sm-2 col-sm-offset-1 btn'>Open</button>
					<button onClick={this.subscribe} className='col-sm-2 btn'>Subscribe</button>
				</div>
			)
		}
		else {
			return (
				<div className='result row' >
					<h3 className='col-sm-2'>{this.props.name}</h3>
					<p className='col-sm-4'>{this.props.description}</p>
					<button onClick={this.open} className='col-sm-2 col-sm-offset-1 btn'>Open</button>
					<button onClick={this.subscribe} className='col-sm-2 btn btn-success disabled'>Subscribed</button>
				</div>
			)
		}
	}
});


ReactDOM.render(<BoardSearch key='0320492042'></BoardSearch>, document.getElementById('boardSearchComponent'));
