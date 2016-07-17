	var BoardSearch = React.createClass({
	getInitialState : function() {
		return {
			results: [],
			style : {
				'border-radius': '10px',
				'background-color': '#004466',
				'border-radius': '10px',
				'border-style': 'solid',
				'border-color': 'black',
				'margin-bottom': '15px',
				'height':'110px'
			}
		}
	},
	search : function() {
		var results = [{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'}]
		this.setState({
			style : {
				'border-radius': '10px',
				'background-color': '#004466',
				'border-radius': '10px',
				'border-style': 'solid',
				'border-color': 'black',
				'margin-bottom': '15px',
				'height':'410px',
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
					<input type='text' className='col-sm-6 col-sm-offset-1 searchInput' placeholder='Board Name or Keyword' ></input>
					<button className='btn btn-lg col-sm-3 col-sm-offset-1 searchButton' onClick={this.search}>Search</button>
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
