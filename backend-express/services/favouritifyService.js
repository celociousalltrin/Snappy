const { errorResponse } = require("../utils/responseHandler");
const { responseMessage } = require("../utils/responseMessage");

exports.createFavouritifyService = async (db, data, res) => {
  try {
    const createFav = await db(data);
    const result = await createFav.save();
    return result;
  } catch (err) {
    console.log(
      "🚀 ~ file: favouritifyService.js:11 ~ exports.createFavouritifyService= ~ err:",
      err
    );
    return errorResponse({ res, responseDetails: responseMessage("ER999") });
  }
};
exports.removeFavouritifyService = async (db, { user_id, snapp_id }, res) => {
  try {
    const result = await db.findOneAndDelete({ user_id, snapp_id });
    return result;
  } catch (err) {
    console.log(
      "🚀 ~ file: favouritifyService.js:11 ~ exports.createFavouritifyService= ~ err:",
      err
    );
    return errorResponse({ res, responseDetails: responseMessage("ER999") });
  }
};

exports.createCommentService = async (db, data, res) => {
  try {
    const createComment = await db(data);
    const result = await createComment.save();
    return result;
  } catch (err) {
    console.log(
      "🚀 ~ file: favouritifyService.js:34 ~ exports.createComment= ~ err:",
      err
    );
    return errorResponse({ res, responseDetails: responseMessage("ER999") });
  }
};

exports.replyCommentService = async (db, { _id, ...rest }, res) => {
  try {
    const repliedComment = await db.findOneAndUpdate(
      { _id },
      { $push: { replies: rest } },
      { new: true }
    );
    return repliedComment;
  } catch (err) {
    console.log(
      "🚀 ~ file: favouritifyService.js:48 ~ exports.replyComment= ~ err:",
      err
    );
    return errorResponse({ res, responseDetails: responseMessage("ER999") });
  }
};
