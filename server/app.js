console.clear();
const express = require("express");
const PORT = 5001;
const products = require("./routes/productCRUD");
const user = require("./routes/authRoutes");
const app = express();
const cors = require("cors");

var options = {
	origin: "*",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: false,
	optionsSuccessStatus: 204,
};

app.use(cors(options));
app.use(express.static("./methods-public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/public/uploads", express.static(__dirname + "/public/uploads")); // image view

app.use("/api/products", products);
app.use("/user", user);

app.listen(PORT, () => {
	console.log(`server running on http://localhost:${PORT}`);
});
