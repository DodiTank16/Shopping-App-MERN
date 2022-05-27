const nodemailer = require("nodemailer");

module.exports.transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "doditank1603@gmail.com",
		pass: "Doditank@1603",
	},
	tls: {
		rejectUnauthorized: false,
	},
});
