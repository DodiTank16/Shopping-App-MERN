const multer = require("multer");

const FILE_TYPE_MAP = {
	"image/png": "png",
	"image/jpeg": "jpeg",
	"image/jpg": "jpg",
};

const fileStorage = multer.diskStorage({
	destination: function (req, file, callback) {
		const isValid = FILE_TYPE_MAP[file.mimetype];
		let uploadError = new Error("invalid image type");

		if (isValid) {
			uploadError = null;
		}

		callback(uploadError, "public/uploads");
	},
	filename: function (req, file, callback) {
		const fileName = file.originalname.split(" ").join("-");
		const extension = FILE_TYPE_MAP[file.mimetype];
		callback(null, `${fileName}-${Date.now()}.${extension}`);
	},
});

const uploadOptions = multer({ storage: fileStorage });

exports.uploadOptions = uploadOptions;
