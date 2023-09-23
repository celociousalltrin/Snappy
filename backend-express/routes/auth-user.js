var express = require("express");
var router = express.Router();

const { create_user } = require("../controllers/authUserController");

router.post("/create-user", create_user);

module.exports = router;
