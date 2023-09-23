var express = require("express");
var router = express.Router();

const {
  signupFormUserNameValidation,
} = require("../controllers/validationController");

router.post("/user-name", signupFormUserNameValidation);

module.exports = router;
