const express = require("express");
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const { sequelize, User, Post } = require("./model"); // db.sequelize

const app = express();
// 사용할 폴더명 설정 정석은 view로
app.set("views", path.join(__dirname, "myfile"));

app.use(express.static(__dirname));
// express엔진을 ejs renderFile 설정
// 뷰 페이지의 폴더 기본 경로로 __dirname + views 이름의 폴더를 사용하겠다는 의미.
app.engine("html", require("ejs").renderFile);

// 뷰 엔진 설정 뷰 엔진으로 ejs를 사용하겠다는 의미.
app.set("view engine", "html");

app.use(express.urlencoded({ extended: false }));
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결됨.");
  })
  .catch((err) => {
    console.error(err);
  });

app.get("/", async (req, res) => {
  const temp = await User.findAll({});
  const users = temp.map((i) => i.dataValues);
  res.render("create", { data: users });
});

app.get("/user", async (req, res) => {
  const temp = await User.findAll({});
  const users = temp.map((i) => i.dataValues);
  res.render("page", { data: users });
});

app.post("/create", async (req, res) => {
  const create = await User.create({
    name: req.body.name,
    age: req.body.age,
    married: req.body.married,
    msg: req.body.msg,
  });
  res.redirect("/user");
});

app.listen(3000, () => {
  console.log("서버 열림");
});
