const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const UserGroup = sequelize.define("UserGroup", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  isadmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = UserGroup;