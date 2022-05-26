const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},

	email: {
		type: Number,
		required: true,
	},

	description: {
		type: String,
		required: true,
	},
});

module.exports = new mongoose.model("Registration", productSchema);
