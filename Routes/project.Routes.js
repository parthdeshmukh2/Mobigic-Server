const express = require("express");
const ProjectModel = require("../Models/project.model.js");

const cloudinary = require("cloudinary").v2;

const ProjectController = express.Router();

//Cloudinary Information Required for uploading a file and cloudinary helps to save our uploded file on cloud and provides a URL for Image.
cloudinary.config({
  cloud_name: "du1vkfugh",
  api_key: "957455487357312",
  api_secret: "dgX8CpNCyPF20myNagV7EwYPX1Y",
  secure: true,
});

// Get All Data for a particular User.
ProjectController.get("/", async (req, res) => {
  const { userId } = req.body;
  const result = await ProjectModel.find({ userId });
  res.send(result);
});

//Post Request to post a data for a specific User.

ProjectController.post("/post", async (req, res) => {
  const { title, userId } = req.body;

  // For unique code generation I used Date.now function and I extract last 6 digit from it.
  let date = Date.now();
  date = date.toString();
  let uniqueCode = "";
  for (let a = date.length - 1; a >= date.length - 6; a--) {
    uniqueCode += date[a];
  }
  uniqueCode = +uniqueCode;

  const file = req.files.image;

  cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
    if (result) {
      const newPost = await new ProjectModel({
        title,
        image: result.url,
        uniqueCode,
        userId,
      });
      await newPost.save();
      res.send({ messege: "Posted Successfully", newPost });
    } else {
      res.send("Something Went Wrong");
    }
  });
});

//Delete function for deleting a file from a particular user if it is present.

ProjectController.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const ProjectItem = await ProjectModel.findOne({ _id: id });
  if (ProjectItem.userId === userId) {
    const result = await ProjectModel.findOneAndDelete({ _id: id });
    res.send("Deleted Successfully");
  } else {
    res.send("Cart Item Not Found");
  }
});

module.exports = ProjectController;
