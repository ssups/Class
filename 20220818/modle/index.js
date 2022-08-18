// mysql2 모듈만 설치를 하고 sequelize 모듈만 사용하면 된다.
const Sequelize = require("sequelize");
const config = require("../config");
const User = require("./users");

const sequelize = new Sequelize(
    config.dev2.database,
    config.dev2.username,
    config.dev2.password,
    config.dev2
);

const db = {};
db.sequelize = sequelize;
db.User = User;

User.init(sequelize);

module.exports = db;
