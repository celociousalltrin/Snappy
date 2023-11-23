exports.isValid = async (db, fieldName, value, length = 1) => {
  try {
    const exists = await db.find({
      [fieldName]: value,
    });

    return exists.length >= length;
  } catch (err) {
    console.log(
      "🚀 ~ file: validationService.js:9 ~ exports.isValid= ~ err:",
      err
    );
  }
};
