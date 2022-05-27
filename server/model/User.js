const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

module.exports = new mongoose.model("user", userModel);
