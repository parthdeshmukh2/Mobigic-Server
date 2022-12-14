const express = require("express");
const connection = require("./Config/db.js");
const cors = require("cors");
const userController = require("./Routes/user.Routes.js");
const fileUpload = require("express-fileupload");
const Authentication = require("./Middlewares/Authentication.js");
const ProjectController = require("./Routes/project.Routes.js");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.send("Home");
});

app.use("/user", userController);

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use("/project", Authentication, ProjectController);

///Project is running on 8080 PORT.
app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected");
  } catch (error) {
    console.log(error);
  }
});
