var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Comment = new Schema({
	body: String
});

module.exports = mongoose.model("Comment", Comment);
