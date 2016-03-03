var TwitterApp = React.createClass ({
	render: function() {
		return(
		<div>
			<h2> TwitterApp </h2>
			<TwitterSearchBar />
			<TwitterBox />
		</div>
		)
	}
});

React.render( <TwitterApp />, document.getElementById('twitter-app'));
