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
	search : function() {
		var results = [{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'}]
		this.setState({
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
			results : results
		});

		//alert('Unimplemented')
		//Create resquest
		//create callback
		//Send resquest for results
	},
	eachResult : function(result, i) {
		return (
			<BoardResult 
			name={result.name}
			index={i}
			key={i}
			description={result.description}
			>
			</BoardResult>
		)
	},
	render : function() {
		
		return (
				<div id='search' className='searcher' overflowY='scroll' style={this.state.style}	>
					<input type='text' className='col-sm-6 col-sm-offset-1 col-xs-12 searchInput' placeholder='Board Name or Keyword' ></input>
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
	render: function() {
		return (
			<div className='result row' >
				<h3 className='col-sm-2'>{this.props.name}</h3>
				<p className='col-sm-4'>{this.props.description}</p>
				<button className='col-sm-2 col-sm-offset-1 btn'>Open</button>
				<button className='col-sm-2 btn'>Subscribe</button>
			</div>
		)
	}
});


ReactDOM.render(<BoardSearch></BoardSearch>, document.getElementById('boardSearchComponent'));
