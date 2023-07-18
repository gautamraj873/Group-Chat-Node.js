const path = require("path");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const sequelize = require("../util/database");

exports.sendMessage = async (req, res, next) => {
  try {
    await Chat.create({
      name: req.user.name,
      message: req.body.message,
      userId: req.user.id,
    });
    return res.status(200).json({ message: "Success!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error" });
  }
};