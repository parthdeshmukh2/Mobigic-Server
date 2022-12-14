const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/user.Model.js");
const ProjectModel = require("../Models/project.model.js");

const userController = express.Router();

//Post function for a user Registration.
userController.post("/register", async (req, res) => {
  const { userName, password } = req.body;
  await bcrypt.hash(password, 8, async (err, hash) => {
    if (err) {
      console.log(err);
      return res.send("Something Went Wrong");
    }
    const result = new UserModel({
      userName,
      password: hash,
    });
    await result.save();
    return res.send({ messege: "Registered Successfully", result });
  });
});

//Post function for a user Login.
userController.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const userLogin = await UserModel.findOne({ userName });
  if (userLogin) {
    const hashedPassword = await userLogin.password;
    await bcrypt.compare(password, hashedPassword, async (err, result) => {
      if (err) {
        return res.send("Wrong Email And Password");
      }
      if (result) {
        const token = jwt.sign(
          { userName: userLogin.userName, userId: userLogin._id },
          "shhhhh"
        );
        return res.send({ messege: "Login Successfull", userLogin, token });
      }
    });
  }
});

module.exports = userController;
