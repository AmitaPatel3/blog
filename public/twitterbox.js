var TwitterBox = React.createClass ({
	propTypes: {
		tweetsArray: React.PropTypes.arrayOf(React.PropTypes.object).isRequired  //this validates propTypes
	},
	render: function() {
		var tweets = this.props.tweetsArray.map(function(t){
			return <TwitterCard screenname={ t.screen_name }
								text={t.text}
								created_at={t.created_at} 
								profile_image_url={t.profile_image_url}/>
		});

		return(
			<div>
				<h4> TwitterBox </h4>
					{ tweets }
			</div>
			)
	}
});