const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const cors = require("cors");
app.use(cors({ origin: "*" }));

const dotenv = require("dotenv");
dotenv.config();

const sequelize = require("./util/database");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userRouter = require("./router/userRouter");
const homePageRouter = require("./router/homePageRouter");
const chatRouter = require("./router/chatRouter.js");
const groupRouter = require("./router/groupRouter");

const User = require("./models/userModel");
const Chat = require("./models/chatModel");
const Group = require("./models/groupModel");
const UserGroup = require("./models/userGroup");

// User associations
User.hasMany(Chat, { onDelete: "CASCADE", hooks: true });
User.hasMany(UserGroup);

// Chat associations
Chat.belongsTo(User);
Chat.belongsTo(Group);
Group.hasMany(Chat);

// Group associations
Group.hasMany(UserGroup);
UserGroup.belongsTo(Group);

// UserGroup associations
UserGroup.belongsTo(User);

app.use("/", userRouter);
app.use("/user", userRouter);
app.use("/homePage", homePageRouter);
app.use("/chat", chatRouter);
app.use("/group", groupRouter);

sequelize
  .sync()
  .then((result) => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));