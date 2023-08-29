const {
  successResponse,
  errorResponse,
} = require("../helpers/responseHandler");
const testModel = require("../models/testModel");

var mongoose = require("mongoose");
const { responseMessage } = require("../validation/responseMessage");

exports.test_user_list = [
  async (req, res) => {
    try {
      var result = await testModel.find();
      return successResponse(res, result);
    } catch (err) {
      console.log("🚀 ~ file: testController.js:60 ~ err:", err);
      return errorResponse(res, responseMessage("ER999"));
    }
  },
];

exports.create_test_user = [
  async (req, res) => {
    try {
      const { body } = req;
      var info = new testModel(body);
      const result = await info.save();

      return res.json("It is created");
    } catch (err) {
      console.log("🚀 ~ file: testController.js:15 ~ err:", err);
      //throw error in json response with status 500.
      return res.json(err);
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

      return res.json(result);
    } catch (err) {
      //throw error in json response with status 500.
      return res.json(err);
    }
  },
];

exports.get_single_test_user = [
  async (req, res) => {
    const { id } = req.params;
    try {
      const result = await testModel.findById(id);
      return successResponse(res, result, responseMessage("OK001"));
    } catch (err) {
      return errorResponse(res, responseMessage("ER999"));
    }
  },
];
