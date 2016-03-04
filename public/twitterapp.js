var TwitterApp = React.createClass ({
	propTypes: {
		url: React.PropTypes.string.isRequired
	},
	getInitialState: function() {
		return{
			tweets: [],
			keyword: 'chocolate'
		}
	},
	onKeywordSubmit: function(newKeyword) {					/*when I get this new keyword from search bar, we are going to render it again*/
		this.setState({keyword: newKeyword});
		this.loadTweetsFromServer(newKeyword)
	},
	loadTweetsFromServer: function (keyword) {
		var self = this;
		$.ajax({
			url: this.props.url + keyword,
			method: 'GET',
		}).done(function(d){
			self.setState({
				tweets: d
			})										//console.log(d) //set state here /*TwitterSearchBarthis is not being passed as a property or state, it's a function that exists in TwitterApp, it's passing in the whole function*/
		})
	},
	componentDidMount: function() {
		//when component is loaded from page, call tweets from server
		this.loadTweetsFromServer(this.state.keyword);
	},
	render: function() {
		return(
		<div>
			<h2> TwitterApp </h2>
			<p> Searching Twitter For: { this.state.keyword } </p>
			<TwitterSearchBar onKeywordSubmit={this.onKeywordSubmit}/>	
			<TwitterBox tweetsArray={ this.state.tweets }/>		
		</div>
		)
	}
});

React.render( <TwitterApp url="/api/tweets/" />, 
	document.getElementById('twitter-app'));
