const { ObjectID } = require("bson");
const { Product } = require("../model/Product");
const MongoClient = require("mongodb").MongoClient;
// const { ObjectId } = require("mongodb");
const { Router } = require("express");

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

const getProducts = async (req, res) => {
	try {
		const products = await db.collection("products").find().toArray();
		console.log(products);
		res.send(products);
		// return res.status(200).json({ success: true, data: products });
	} catch (error) {
		return res.status(400).send(error.message);
	}
};
const getSpecficProducts = async (req, res) => {
	const { id } = req.params;
	console.log(id);
	const specficProduct = await db.collection("products").findOne({
		_id: ObjectID(req.params.id),
	});
	console.log(specficProduct);
	if (specficProduct) {
		return res.send(specficProduct);
		// return res.status(201).json({ success: true, product: specficProduct });

		// const product = products.filter((product) => product.productcat === type);
	} else {
		return res.status(404).send({ message: `No Product with id ${id} ` });
	}
	// return res
	// 	.status(404)
	// 	.json({ success: false, message: `No Product with id ${id} ` });
};

const createProduct = async (req, res) => {
	//! Product Data Post

	try {
		const file = req.file;
		if (!file)
			return res.status(400).send("No image are upload in the request");

		const filename = file.filename;
		const basename = `${req.protocol}://${req.get("host")}/public/uploads/`;

		let newProduct = {
			title: req.body.title,
			price: req.body.price,
			description: req.body.description,
			category: req.body.category,
			image: `${basename}${filename}`,
			rating: {
				rate: req.body.rate,
				count: req.body.count,
			},
		};

		await db.collection("products").insertOne(newProduct);
		return res.send(newProduct);

		// newProduct = await newProduct.save();

		// if (!newProduct)
		// 	return res.status(500).send("Sorry... The Product Cannot be Created");

		// res.send(newProduct);
	} catch (error) {
		return res.status(400).send(error.message);
	}

	// await db.collection("products").insertOne(req.body);
	// res.send("added!!");
	// console.log(req.body);

	// const { name } = req.body
	// if (!name) {
	//     return res.status(400).json({ success: false, message: 'Please Provide name value' })
	// }
	// res.status(201).json({ success: true, product: name })
};

const createProductPostman = (req, res) => {
	// const { name } = req.body;
	// if (!name) {
	// 	return res
	// 		.status(400)
	// 		.json({ success: false, message: "Please Provide name value" });
	// }
	// res.status(201).json({ success: true, product: { ...products, name } });
};

const updateProduct = async (req, res) => {
	// console.log(req.params, req.body);
	// // const product = products.find((product) => product.id === Number(id))
	// const product = await db.collection("products").updateOne(
	// 	{
	// 		_id: ObjectID(req.params.type),
	// 	},
	// 	{ $set: req.body }
	// );
	// if (!product) {
	// 	return (
	// 		res.status(404),
	// 		json({ success: false, message: `No product with ID ${id} ` })
	// 	);
	// }
	//	// const newProduct = products.map((product) => {
	//	//     if (product.id === Number(id)) {
	//	//         product.name = name;
	//	//     }
	//	// return product
	//	// })
	//res.status(200).json({ success: true, data: product });
};

const deleteProduct = async (req, res) => {
	// // const product = products.find((product) => product.id === Number(req.params.id))
	// console.log(req.params.type);
	// const newproducts = await db.collection("products").deleteOne({
	// 	_id: ObjectID(req.params.type),
	// });
	// console.log(`1 document was deleted.`);
	// // if (!product) {
	// //     return res
	// //         .status(404)
	// //         .json({ success: false, msg: `no product with id ${req.params.id}` })
	// // }
	// // const newproducts = products.filter(
	// //     (product) => product.id !== Number(req.params.id)
	// // )
	// return res.status(200).json({ success: true, data: newproducts });
};

module.exports = {
	getProducts,
	getSpecficProducts,
	createProduct,
	createProductPostman,
	updateProduct,
	deleteProduct,
};
