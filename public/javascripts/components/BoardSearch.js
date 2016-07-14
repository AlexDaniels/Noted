var BoardSearch = React.createClass({
	getInitialState : function() {
		return {
			results: [],
			style : {
				'height':'110px'
			}
		}
	},
	search : function() {
		var results = [{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'},{'name':'board','description':'A board for all boards to board'}]
		this.setState({
			style : {
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
			<div style={this.state.style}>
				<div id='search row' overflowY='scroll'>
					<input type='text' className='col-lg-6 col-lg-offset-1 searchInput' placeholder='Board Name or Keyword' ></input>
					<button className='btn btn-lg col-lg-3 col-lg-offset-1 searchButton' onClick={this.search}>Search</button>
					<br />
					<br /> 
					<br />
				</div>
				<br />
				<br />
				<br />
				<br />
					 {this.state.results.map(this.eachResult)}
			</div>
		)
	}
});

var BoardResult = React.createClass({
	render: function() {
		return (
			<div className='result row' >
				<h3 className='col-lg-4'>{this.props.name}</h3>
				<p className='col-lg-4'>{this.props.description}</p>
				<button className='col-lg-1 col-lg-offset-1 btn'>Open</button>
				<button className='col-lg-1 btn'>Subscribe</button>
			</div>
		)
	}
});

window.onload = function() {
	ReactDOM.render(<BoardSearch></BoardSearch>, document.getElementById('boardSearch'));
}