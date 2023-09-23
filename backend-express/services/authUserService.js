const { uploadImageService } = require("./cloudinary");
const bcrypt = require("bcryptjs");

const passwordHashing = (password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

exports.createUserService = async (db, userData) => {
  try {
    const { user_name, confirm_password, investor_data_url, friends, ...rest } =
      userData;
    const cloudinaryImage = await uploadImageService(investor_data_url);

    const hassedPassword = passwordHashing(confirm_password);

    const newUser = await db({
      ...rest,
      investor_image: cloudinaryImage,
      password: hassedPassword,
      user_name,
    });
    await newUser.save();
  } catch (err) {
    console.log(
      "🚀 ~ file: userService.js:5 ~ exports.createUserService= ~ err:",
      err
    );
  }
};
