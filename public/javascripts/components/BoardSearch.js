var BoardSearch = React.createClass({
	getInitialState : function() {
		return null;
	},
	search : function() {

	},
	render : function() {
		return (
				<div>
					<input type='text' className='col-lg-6' defaultValue='Board Name or Keyword'></input>
					<button className='btn btn-lg col-lg-3'>Search</button>
				</div>
		)
	}
});

window.onload = function() {
	ReactDOM.render(<BoardSearch></BoardSearch>, document.getElementById('boardSearch'));
}