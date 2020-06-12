var axios = require("axios");
var cheerio = require("cheerio");
var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");

var db = require("./models");
var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines", {useNewUrlParser: true});

app.get("/scrape", function(req, res)
{
	axios.get("https://www.oann.com").then(function(response)
	{
		var $ = cheerio.load(response.data);
		$("article h3 a").each(function()
		{
			var result = {};
			result.title = $(this).text();
			result.link = $(this).attr("href");

			db.Article.create(result).then(function(article)
			{
				console.log(article);
			}).catch(function(err)
			{
				console.log(err);
			});
		});

		res.send("Scrape Complete");
	});
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, function()
{
	console.log("RUNNING ON " + PORT);
});
