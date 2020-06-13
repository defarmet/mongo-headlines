var current_article = "";

$("#articles").text("Loading articles...");

$.ajax({
	method: "GET",
	url: "/scrape"
}).then(function(data)
{
	$.getJSON("/articles", function(data)
	{
		$("#articles").empty();
		data.forEach(function(value)
		{
			var article = $("<p>").attr("data-id", value._id);
			article.append(value.title).append($("<br>"));
			article.append(value.link);
			$("#articles").append(article);
		});
	});
});

function display_comments(id)
{
	$.ajax({
		method: "GET",
		url: "/articles/" + id
	}).then(function(data)
	{
		console.log(data);
		$("#comments").empty();
		current_article = id;

		$("#comments").append($("<h3>").text(data.title));
		var comment = $("<textarea>").attr("id", "comment");
		comment.attr("name", "body").addClass("w-100");
		$("#comments").append(comment);
		var button = $("<button>").addClass("btn btn-primary");
		button.attr("id", "submit").attr("data-id", data._id);
		button.text("Submit");
		$("#comments").append(button).append("<br><br><br>");

		data.comments.forEach(function(comment)
		{
			var del = $("<button>").attr("data-id", comment._id);
			del.addClass("btn btn-danger btn-sm float-left")
			del.text("X");
			$("#comments").append(del);
			$("#comments").append($("<p>").text(comment.body));
		});
	});
}

$(document).on("click", "p", function()
{
	display_comments($(this).attr("data-id"));
});

$(document).on("click", "#submit", function()
{
	$.ajax({
		method: "POST",
		url: "/articles/" + $(this).attr("data-id"),
		data: {
			body: $("#comment").val()
		}
	}).then(function(data)
	{
		display_comments(data._id);
	});
});

$(document).on("click", ".btn-danger", function()
{
	$.ajax({
		method: "DELETE",
		url: "/comments/" + $(this).attr("data-id")
	}).then(function(data)
	{
		display_comments(current_article);
	});
});
