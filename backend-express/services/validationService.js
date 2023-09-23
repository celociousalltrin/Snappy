exports.isUnique = async (db, fieldName, value) => {
  try {
    const exists = await db.find({
      [fieldName]: value,
    });

    return exists.length > 0;
  } catch (err) {
    console.log(
      "🚀 ~ file: validationService.js:5 ~ exports.isUnique= ~ err:",
      err
    );
  }
};
