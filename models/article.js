var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Article = new Schema({
	title: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true,
		unique: true
	},
	comments: {
		type: Schema.Types.ObjectId,
		ref: "Comments"
	}
});

module.exports = mongoose.model("Article", Article);
