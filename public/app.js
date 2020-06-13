$.getJSON("/articles", function(data)
{
	console.log(data);
	data.forEach(function(value)
	{
		var id = "data-id='" + value._id + "'";
		var title = value.title;
		var link = value.link;
		var article = "<p " + id + ">" + title + "<br>" + link + "</p>"
		$("#articles").append(article);
	});
});

$(document).on("click", "p", function()
{
	$("#comments").empty();

	$.ajax({
		method: "GET",
		url: "/articles/" + $(this).attr("data-id")
	}).then(function(data)
	{
		console.log(data);

		$("#comments").append("<h2>" + data.title + "</h2>");
		var comment = "<textarea id='comment' name='body'></textarea>";
		$("#comments").append(comment);
		var button = "<button class='btn' id='submit' data-id='"
		button += data._id + "' >Submit</button>"
		var button = $("<button>").addClass("btn").attr("id", "submit");
		button.attr("data-id", data._id).text("Submit");
		$("#comments").append(button);

		data.comments.forEach(function(comment)
		{
			$("#comments").append("<br>");
			$("#comments").append("<p>" + comment.body + "</p>");
		});
	});
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
		console.log(data);
	});

	$("#comment").val("");
});
