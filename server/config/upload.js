const multer = require("multer");

const storage = multer.diskStorage({
  destination: "../images",
  filename: (req, file, cb) => {
    const filename = file.originalname.replace(/\s/g, "") + "-" + Date.now();
    cb(null, filename);
  },
});

const upload = multer({ storage });

module.exports = { upload };
