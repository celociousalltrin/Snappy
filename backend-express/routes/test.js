var express = require("express");
var router = express.Router();
const {
  create_test_user,
  get_single_test_user,
  update_test_user,
  test_user_list,
} = require("../controllers/testController");

router.route("/").get(test_user_list).post(create_test_user);

router.route("/:id").get(get_single_test_user).put(update_test_user);

module.exports = router;
