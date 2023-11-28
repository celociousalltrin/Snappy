var express = require("express");
const {
  getUser,
  updateUser,
  changeUserPassword,
  getUserBasedOnSearch,
} = require("../controllers/userController");

var router = express.Router();

router.get("/:userId", getUser);
router.get("/user-search/:search", getUserBasedOnSearch);
router.put("/", updateUser);
router.put("/change-password", changeUserPassword);

module.exports = router;
