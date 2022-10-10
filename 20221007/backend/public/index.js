// 설치해야 할것
// sequelize, mysql2
const Sequelize = require("sequelize");
const config = require("../config");
const User = require("./user");
const Item = require("./item");

const sequelize = new Sequelize(
  config.dev.database,
  config.dev.username,
  config.dev.password,
  config.dev
);

const db = {};

db.sequelize = sequelize;
db.User = User;
db.Item = Item;

// 테이블 생성
User.init(sequelize);
Item.init(sequelize);

module.exports = db;
