const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".PNG") {
      req.fileValidationError = "Forbidden extension";
      return cb(null, false, req.fileValidationError);
      // cb(new Error("File type is not supported"), false);
      // return;
    }
    cb(null, true);
  },
});