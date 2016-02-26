var mongoose = require('mongoose');
var Schema = mongoose.Schema; //mongoose.Schema is a method on mongoose

var BlogSchema = new Schema({  //it's a constructor function--making a schema like a model to tell it what to do with bears
	title: String,
	image: String,
	content: String,
	author: String,
	date: {type: Date, default: Date.now}
		//don't put a comma at the end of the Schema object
});

module.exports = mongoose.model('Blog', BlogSchema); 

