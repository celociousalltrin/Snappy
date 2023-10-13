exports.isExist = async (db, fieldName, value) => {
  try {
    const exists = await db.find({
      [fieldName]: value,
    });

    return exists.length > 0;
  } catch (err) {
    console.log(
      "🚀 ~ file: validationService.js:9 ~ exports.isExist= ~ err:",
      err
    );
  }
};
