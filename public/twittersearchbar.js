var TwitterSearchBar = React.createClass ({
	getInitialState: function() {
		return {newKeyword: ''}
	},
	handleKeywordChange: function(e) {
		this.setState({						/*this is doing the magic of changing state as we type in search bar*/
			newKeyword: e.target.value
		})
	},
	handleFormSubmit: function(e){
		e.preventDefault();

		var newKeyword = this.state.newKeyword.trim();

		this.props.onKeywordSubmit(newKeyword);			/*getting new state of keyword and give it to this function on keyword sumbit*/
	},

	render: function () {
	return(
		<form onSubmit={this.handleFormSubmit}>
			<div>
				<input onChange={this.handleKeywordChange} 
				value={this.state.keyword} 
				type="text" placeholder="search" />
				<button> go </button>
			</div>
		</form>
		)
	}
});