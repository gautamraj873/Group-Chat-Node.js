const path = require("path");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const Group = require("../models/groupModel");
const sequelize = require("../util/database");
const { Op } = require("sequelize");

const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("getMessages", async (groupName) => {
    try {
      const group = await Group.findOne({ where: { name: groupName } });
      const messages = await Chat.findAll({
        where: { groupId: group.dataValues.id },
      });
      console.log("Request Made");
      io.emit("messages", messages);
    } catch (error) {
      console.log(error);
    }
  });
});

exports.sendMessage = async (req, res, next) => {
  try {
    const group = await Group.findOne({
      where: { name: req.body.groupName },
    });

    await Chat.create({
      name: req.user.name,
      message: req.body.message,
      userId: req.user.id,
      groupId: group.dataValues.id,
    });
    return res.status(200).json({ message: "Success!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error" });
  }
};