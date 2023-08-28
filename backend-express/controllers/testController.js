const testModel = require("../models/testModel");

var mongoose = require("mongoose");

exports.test_user_list = [
  async (req, res) => {
    try {
      var result = await testModel.find();
      return res.send(result);
    } catch (err) {
      console.log("🚀 ~ file: testController.js:60 ~ err:", err);
      //throw error in json response with status 500.
      res.send(err);
    }
  },
];

exports.create_test_user = [
  async (req, res) => {
    try {
      const { body } = req;
      var info = new testModel(body);
      await info.save();

      return res.send("It is created");
    } catch (err) {
      console.log("🚀 ~ file: testController.js:15 ~ err:", err);
      //throw error in json response with status 500.
      return res.send(err);
    }
  },
];

exports.update_test_user = [
  async (req, res) => {
    try {
      const { body } = req;
      const { id } = req.params;

      const result = await testModel
        .findOneAndUpdate({ _id: id }, { ...body }, { new: true })
        .exec();

      return res.send(result);
    } catch (err) {
      //throw error in json response with status 500.
      return res.send(err);
    }
  },
];

exports.get_single_test_user = [
  async (req, res) => {
    const { id } = req.params;
    try {
      const result = await testModel.findById(id);
      res.send(result);
    } catch (err) {
      res.send(err);
      console.log("🚀 ~ file: testController.js:62 ~ async ~ err:", err);
    }
  },
];
