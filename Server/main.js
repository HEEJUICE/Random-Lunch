const path = require("path");
const express = require("express");
const compress = require("compression");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const controller = require("./controller");

mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on("error", (error) => {
  console.error("몽고디비 연결 에러", error);
});
db.on("disconnected", () => {
  console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
  this.connect("mongodb://localhost/mini-project-lunch");
});
db.once("open", () => {
  console.log("몽고디비 연결 성공!");
});

mongoose.connect("mongodb://localhost/mini-project-lunch", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const app = express();
app.use(compress());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.219.102:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true
  })
);

app.use("/api", controller);

const buildDir = path.resolve(__dirname, "..", "build");
app.use(express.static(buildDir));
app.get("/", (req, res) => {
  res.sendFile(path.join(buildDir, "index.html"));
});

app.listen(2018, () => {
  console.log("Lunch app is listening on port 2018!"); // eslint-disable-line no-console
});

module.exports = app;
