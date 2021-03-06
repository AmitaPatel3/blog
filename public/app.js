var deleteBlog = function(event) {
	event.preventDefault();
	console.log('hello');
	var id = $(event.target).closest('tr').attr('id');  
	var blog = $(event.target).closest('tr');


		if(confirm("sure you wanna delete blog?")) {
			$.ajax({
				url: '/api/blog/' + id,
				method: 'DELETE',
			}).done(function () {
				console.log('blog deleted!');
				blog.remove();
		})
	}
}



$('.deleteBlog').on('click',deleteBlog)

var addBlog = function(event) {
	event.preventDefault();

	var image = $('#image').val();
	var title = $('#title').val();
	var author = $('#author').val();
	var content = $('#content').val();
	var $table = $('#blogTable');

	var blog = {};

	blog.image = image;
	blog.title = title;
	blog.author = author;
	blog.content = content;

	$.ajax({
		url: 'api/blog/',
		method: 'POST',
		data: blog
	}).done(function(data) {
		console.log('I posted a blog!', data);

		$table.append ('<tr id=' + data._id + '> \
	                    <td>' + data.image + '</td> \
	                    <td>' + data.title + '</td> \
	                    <td>' + data.author + '</td>\
	                     <td>' + data.content + '</td>\
	                   <td><button type="button" class="btn btn-warning deleteBlog">Delete</button></td>'
	   );
	});

	$('#image').val('');
	$('#title').val('');
	$('#author').val('');
	$('#content').val('');
}



$('#addBlog').on('click', addBlog);







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

