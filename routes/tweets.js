require('dotenv').config();
var express = require('express');
var router = express.Router();
var Twit = require('twit')

var T = new Twit({
	consumer_key: 			   process.env.CONSUMER_KEY,
	consumer_secret: 		   process.env.CONSUMER_SECRET,
	access_token:			     process.env.ACCESS_TOKEN,
	access_token_secret: 	 process.env.ACCESS_TOKEN_SECRET, 
	timeout_ms: 			     60*1000,
})

router.route('/:keyword') //: is dynamic, it's going to be a parameter
	.get(function(req, res){
		var keyword = req.params.keyword; //or you can use res.json(message: 'it worked!')

		T.get('search/tweets', { q: keyword + ' since:2011-07-11 ', count: 10 }, function(err, data, response) {

  		var myTweetArr = data.statuses.map(function(item) {
  			return { text: item.text, 
  					screenname: item.user.screen_name, 
  					created_at: item.created_at, 
  					profile_image_url: item.user.profile_image_url,
  					}
  		});
  			
  		res.json(myTweetArr)
  		})
});
 

module.exports = router;

// var test = function(keyword) {
//   var myKeyword = req.params.keyword;
// }