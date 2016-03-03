var TwitterCard = React.createClass({
  getInitialState: function() {
    return {
      tweets: []
    }
  },
  loadTweetsFromServer: function() {
    var self = this;

    $.ajax({
      url: this.props.url,
      method: 'GET',
    }).done(function(data){
    	console.log('found data', data)
      self.setState( {tweets: data} )
    })
  },
  componentDidMount: function() {
    this.loadTweetsFromServer();
  },
  render: function(){

    var twitterCards = this.state.tweets.map(function(item){
    return (
    	<div className="media col-sm-3">
          <div className="media-left">
            <a href="#">
              <img className="img-circle" src={ item.profile_image_url } alt="..."/>
            </a>
          </div>
          <div className="media-body">
            <h4 className="media-heading">{ item.screenname }</h4>
            <p>{ item.text }</p>
            <p>{ item.created_at }</p>
          </div>
        </div>
      )
    });
    return (
        <div>
          { twitterCards }
        </div>
      )
  }
});

React.render(<TwitterCard url="/api/tweets/tigers"/>, 
	 document.getElementById('twitter-card'));



