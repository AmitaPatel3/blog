var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

var blogRouter = require('./routes/blogs');
var Blog = require('./models/blog');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({											//configuring our app to tell it to use passport
 secret: 'ilovescotchscotchyscotchscotch'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(session({
 cookie: {
   maxAge: 60000
 }
}));

app.use(flash());

require('./config/passport')(passport);
// routes ======================================================================
require('./routes/user.js')(app, passport);

app.use(express.static('public')); //tells our server that everything in the folder 'public' is served as static files

//need next for using middleware--tells it to go to next//this will be activated every time there is a user
app.use(function(req, res, next) { 
	var user = req.user || "no user";
	console.log(user);
	next();
});


app.set('view engine', 'ejs'); //we are configuring our app--telling our app how to handle this function--view our engine using ejs

app.get('/', function(req, res){  //we are then saying, app, here's the function--render the index--do blog.find 
	var user = req.user || "no user";
	res.render('index', {user: user});				//linking to index.ejs
});


app.get('/about', function(req,res) {					//linking to ejs file--bears.ejs
	res.render('about', {title: 'welcome to my about page'})  //we are setting up our page---render all bears
		
});

app.get('/blog', function(req,res) {
	Blog.find(function(err,data){
		if(err) {
			console.log(err)
		} else {
			res.render('blog', {blogs: data})
		}
	})
});

app.get('/skills', function(req,res) {
	res.render('skills', {title: 'welome to skills'})
});

app.get('/portfolio', function(req,res) {
	res.render('portfolio', {title: 'welcome to portfolio'})
});


app.get('/about', function(req,res){				//testing if we are linked
	var data = {};									
	data.title = "Blogs oh my!"

	res.render('about', data)
});

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next) {				//this is the same as app.post in 'bear files'
	console.log('something is happening!');
	next();
});


router.get('/', function(req, res) {
	res.json({title: 'hooray! it worked!'});
});



app.use('/api', blogRouter);  //this states that fill in api after //




app.listen(port, function() {
console.log('Magic happens on port' + port);
});