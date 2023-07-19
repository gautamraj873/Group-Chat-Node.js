const path = require("path");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const sequelize = require("../util/database");
const { Op } = require("sequelize");

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

exports.getMessages = async (req, res, next) => {
  try {
    const param = req.params.param;
    const messages = await Chat.findAll({
      where: {
        id: {
          [Op.gte]: param,
        },
      },
    });
    return res.status(200).json({ messages: messages });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};