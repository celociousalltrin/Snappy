var express = require("express");
var router = express.Router();

const {
  signupFormUserNameValidation,
  signupFormEmailValidation,
} = require("../controllers/validationController");

router.post("/user-name", signupFormUserNameValidation);
router.post("/user-email", signupFormEmailValidation);

module.exports = router;
