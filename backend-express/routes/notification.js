var express = require("express");
const {
  createNotification,
  readNotification,
  clearnotification,
  getNotificationList,
  clearSingleNotification,
} = require("../controllers/notificationController");
var router = express.Router();

router
  .route("/")
  .post(createNotification)
  .put(readNotification)
  .delete(clearnotification);

router.delete("/:id", clearSingleNotification);

router.get("/:notify", getNotificationList);

module.exports = router;
