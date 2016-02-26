//THIS IS RESPONSIBLE FOR CRUD FOR ALL BEARS

var express = require('express')
var router = express.Router(); //express.Router is a method on express--everytime we create a new route we are using this router;created a new object which is a router , using a new express function, we need a new router object/setting up a road for the api which is a car
var Blog = require('../models/blog')


router.route('/blog')				//all these routers are /api routers--look at server.js ('port/api/bears)')	//we are grabbing the urlname (/bears) and we are using this function on this url
	.post(function(req,res) {							//creates a Bear
									//get, post, delete is an http verb

		var blog = new Blog();		//constructing a new Bear

	
		blog.title = req.body.title;			//coming from our request--from our form or from our Postman--our data lives in the "body--which is a method of request"
		blog.image = req.body.image;
		blog.content = req.body.content;
		blog.author = req.body.author;
		blog.date = req.body.date;

		blog.save(function(err,blog) {   //.save is a mongoose.model.save

											//at a high level, there is a request, and it comes back with a response
			if(err){
				console.log(err)
			} else {
				res.json(blog)				//returing the bear in json format
											//save the bear adn tell me if it worked or not

			}									//we are creating our resources/bear is our data which is one of our resource

		})
	})
		

	.get(function(req,res) {							//find all bears--finding the entire collection
		Blog.find(function(err,blogs) {
			if(err) {
				console.log(err)
			} else {
				res.json(blogs)							
			}
		})
	});


router.route('/blog/:blog_id')									//find a bear by ID
	.get(function(req,res) {
		Blog.findById(req.params.blog_id, function(err,blog) { //findById comes with mongoose, mongoose method which requires an error callback
			if (err) {												//req.params by id in the url//request is coming from our url
				console.log(err);
			} else {											//a callback is just a function--a function can take another function--ex. went to order a cup of coffee at Starbucks, call my name out and said your coffee is done, or we don't have coffee and go home
				res.json(blog);									//callback is really the function(err,bear)
			}
		})

	})


	.put(function(req,res) {										//changes a bear by finding it by ID
		Blog.findById(req.params.blog_id, function(err,blog) {
				if (err) {
				console.log(err);
				} else {
				blog.title = req.body.title ? req.body.title : blog.title;  //ternary expression (expression always returns a value)
				blog.image = req.body.image ? req.body.image : blog.image;
				blog.content = req.body.content ? req.body.content : blog.content;
				blog.author = req.body.author ? req.body.author : blog.author;
				blog.date = req.body.date ? req.body.date : blog.date;

					blog.save(function(err, newBlog) {
					if (err) {
						console.log(err);
					} else {
					res.json({message: 'Blog updated!'});
					}

				})
			}
		})
	})


	.delete(function(req,res) {											//delete bear by id
		Blog.remove({_id: req.params.blog_id}, function (err,blog){
			if(err) {
				console.log(err);
			} else {
			  res.json({title:'blog was successfully deleted!'});	
			}
		})
	});

module.exports = router;