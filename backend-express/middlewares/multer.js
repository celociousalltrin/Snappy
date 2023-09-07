var multer = require("multer");

const multerMiddleware = () => {
  const storage = new multer.memoryStorage();

  const upload = multer({
    storage,
  }).single("myFile");

  return upload;
};

module.exports = multerMiddleware;
