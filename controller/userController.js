const path = require("path");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("../util/database");
const { Op } = require("sequelize");

function generateAccessToken(id, email) {
  return jwt.sign({ userId: id, email: email }, process.env.TOKEN);
}

exports.getLoginPage = async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../", "public", "views", "login.html"));
  } catch (error) {
    console.log(error);
  }
};

exports.postUserSignUp = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const number = req.body.number;
    const password = req.body.password;

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { number: number }],
      },
    });

    if (user) {
      res.status(409).send(`<script>alert('This email or number is already taken. Please choose another one.'); window.location.href='/'</script>`);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        name: name,
        email: email,
        number: number,
        password: hashedPassword,
      });
      res.status(200).send(`<script>alert('User Created Successfully!'); window.location.href='/'</script>`);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.postUserLogin = async (req, res, next) => {
  try {
    const email = req.body.loginEmail;
    const password = req.body.loginPassword;

    const user = await User.findOne({ where: { email: email } });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(500).json({ success: false, message: "Something went wrong!" });
        }
        if (result === true) {
          return res.status(200).json({
            success: true,
            message: "Login successful!",
            token: generateAccessToken(user.id, user.email),
          });
        } else {
          return res.status(401).json({
            success: false,
            message: "Incorrect password!",
          });
        }
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

