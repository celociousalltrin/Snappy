const { responseMessage } = require("../utils/responseMessage");

exports.userListService = async (db) => {
  try {
    const userList = await db.find();
    return userList;
  } catch (err) {
    console.log(
      "🚀 ~ file: testServices.js:6 ~ exports.userListService= ~ err:",
      err
    );
    throw new Error("Failed to fetch user");
  }
};

exports.createUserService = async (db, userData) => {
  try {
    const newUser = await db(userData);
    await newUser.save();
  } catch (err) {
    console.log(
      "🚀 ~ file: testServices.js:19 ~ exports.createUserService= ~ err:",
      err
    );
    throw responseMessage("ER999");
  }
};

exports.updateUserService = async (db, userData, userId) => {
  try {
    const updateUser = await db
      .findOneAndUpdate({ _id: id }, { ...body }, { new: true })
      .exec();
    return updateUser;
  } catch (err) {
    console.log(
      "🚀 ~ file: testServices.js:30 ~ exports.updateUser= ~ err:",
      err
    );
    throw new Error("Failed to fetch user");
  }
};

exports.getSingleUserService = async (db, userId) => {
  try {
    const getUser = await db.findById(userId);
    return getUser;
  } catch (err) {
    console.log(
      "🚀 ~ file: testServices.js:46 ~ exports.getSingleUserService= ~ err:",
      err
    );
    throw new Error("Failed to fetch user");
  }
};
