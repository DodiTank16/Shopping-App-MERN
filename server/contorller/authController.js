const user = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { handleErrors, transporter } = require("../common/functions");
const MongoClient = require("mongodb").MongoClient;

let db;
let ConnectionUrl = "mongodb://localhost:27017";
let databaseName = "Shoppingdb";

(async function () {
	try {
		const client = await MongoClient.connect(ConnectionUrl);
		db = client.db(databaseName);
		console.log(`Connection Done to :- ${databaseName}`);
	} catch (err) {
		throw err;
	}
})();

// const maxAge = 3 * 24 * 60 * 60;
// const createToken = (id) => {
// 	return jwt.sign({ id }, "Secret", {
// 		expiresIn: maxAge,
// 	});
// };

// module.exports.signup_get = (req, res) => {
// 	res.render("signup");
// };
// module.exports.login_get = (req, res) => {
// 	res.render("login");
// };
module.exports.signup_post = async (req, res) => {
	const { email, password } = req.body;
	try {
		const existinguser = await db.collection("users").findOne({
			email: email,
		});
		if (existinguser) return res.status(400).send("user Already Registered");

		const hashedPassoword = await bcrypt.hash(password, 10);
		let userCreation = {
			email: email,
			password: hashedPassoword,
		};
		const newUser = await db.collection("users").insertOne(userCreation);
		return res.send(newUser);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong" });
	}
};
module.exports.login_post = async (req, res) => {
	const { email, password } = req.body;
	try {
		const existinguser = await db.collection("users").findOne({
			email: email,
		});
		console.log(existinguser);
		if (!existinguser) return res.status(400).send("User Not Found");

		const matchPassword = await bcrypt.compare(password, existinguser.password);

		if (!matchPassword) {
			return res.status(400).json({ Message: "Invalid credentials" });
		}
		const maxAge = 3 * 24 * 60 * 60;
		const createToken = jwt.sign(
			{ email: existinguser.email, id: existinguser._id },
			"Secret",
			{
				expiresIn: maxAge,
			}
		);
		res.status(200).json({ user: existinguser, token: createToken });

		// const user = await User.login(email, password);
		// const token = createToken(user._id);
		// res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
		// res.status(200).json({ user: user._id });
	} catch (err) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong" });
	}
};

// module.exports.logout_get = (req, res) => {
// 	res.cookie("jwt", "", { maxAge: 1 });
// 	res.redirect("/");
// };

// module.exports.verification = async (req, res) => {
// 	try {
// 		const token = req.query.token;
// 		const user = await User.findOne({ emailToken: token });
// 		if (user) {
// 			user.emailToken = null;
// 			user.isVerified = true;

// 			await user.save((err) => {
// 				if (err) console.log(err);
// 			});
// 			res.redirect("/");
// 		}
// 	} catch (err) {
// 		console.log(err);
// 		res.redirect("/signup");
// 	}
// };
