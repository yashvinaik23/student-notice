const express = require("express");
const userRouter = require("./routers/user");
const resultRouter = require("./routers/results");
const holidayRouter = require("./routers/holiday");
const contactRouter = require("./routers/contact");
var cors = require("cors");
const { Model } = require("mongoose");
require("./Database/mongoose");

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(resultRouter);
app.use(holidayRouter);
app.use(contactRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

const results = require("./models/results");
const User = require("./models/user");

// const main = async () => {
//   // const task = await tasks.findById("61f923af8b1177dda13ed5d9");
//   // await task.populate("owner"); //.execPopulate();
//   // console.log(task.owner);
//   const user = await User.findById("61f92223aec1233dd7138113");
//   await user.populate("results"); //.execPopulate();
//   console.log(user.results);
// };
// main();

const jwt = require("jsonwebtoken");
const myFunction = async () => {
  const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse", {
    expiresIn: "30 days",
  });
  console.log(token);

  const data = jwt.verify(token, "thisismynewcourse");
  console.log(data);
};

myFunction();
