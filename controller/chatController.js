const path = require("path");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const Group = require("../models/groupModel");
const sequelize = require("../util/database");
const { Op } = require("sequelize");

exports.sendMessage = async (req, res, next) => {
  try {
    const group = await Group.findOne({
      where: { name: req.body.groupName },
    });
    await Chat.create({
      name: req.user.name,
      message: req.body.message,
      userId: req.user.id,
      groupId: group.dataValues.id
    });
    return res.status(200).json({ message: "Success!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error" });
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const param = req.query.param;
    console.log(req.query.groupName);
    const group = await Group.findOne({
      where: { name: req.query.groupName },
    });
    const messages = await Chat.findAll({
      where: {
        [Op.and]: {
          id: {
            [Op.gt]: param,
          },
          groupId: group.dataValues.id,
        },
      },
    });
    return res.status(200).json({ messages: messages });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};