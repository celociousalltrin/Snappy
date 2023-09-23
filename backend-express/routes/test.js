var express = require("express");
var router = express.Router();

var multerMiddleware = require("../middlewares/multer");

const {
  create_test_user,
  get_single_test_user,
  update_test_user,
  test_user_list,

  upload_cloudinary_test,
  delete_cloudinary_test,
} = require("../controllers/testController");

// router.route("/").get(test_user_list).post(create_test_user);

router.route("/:id").get(get_single_test_user).put(update_test_user);

router
  .route("/upload-cloudinary-image")
  .post(multerMiddleware(), upload_cloudinary_test);

router.route("/delete-cloudinary-image").post(delete_cloudinary_test);

module.exports = router;
