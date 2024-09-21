const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "./public/images/",
    filename: (_, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 100000);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
})

const upload = new multer({ storage: storage });

module.exports = upload;