var TwitterCard = React.createClass ({
	render: function () {
		return (
			<div>
				<div className="panel panel-default">
					<div className="panel-header">
						<img src={this.props.profile_image_url} className="img-thumbnail" />
						<p> {this.props.screenname} </p>
						<p> {this.props.text} </p>
						
					<div className="panel-footer">
						<p> {this.props.created_at} </p>
					</div>
					</div>
				</div>
			</div>
			)
		}
});


