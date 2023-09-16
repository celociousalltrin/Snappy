exports.createUserService = async (db, userData) => {
  try {
    const newUser = await db(userData);
    await newUser.save();
  } catch (err) {
    console.log(
      "🚀 ~ file: userService.js:5 ~ exports.createUserService= ~ err:",
      err
    );
  }
};
