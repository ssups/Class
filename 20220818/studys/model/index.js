const Sequelize = require("sequelize");
const config = require("../config/config");
const User = require("./users");
const Post = require("./post");
const sequelize = new Sequelize(
  config.dev.database,
  config.dev.user,
  config.dev.password,
  config.dev
);
const db = {};

db.sequelize = sequelize;
db.User = User;
db.Post = Post;

User.init(sequelize);
Post.init(sequelize);

User.associate(db);
Post.associate(db);

module.exports = db;
