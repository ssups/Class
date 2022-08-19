const Sequelize = require("sequelize");
// console.log(Sequelize);

// config.js 에서 module.exports = config 로 내보내기를 하고
// 여기서 밑에방식으로 import
const { config, config2 } = require("../config/config.js");

// 시퀄라이즈 객체 생성
const sequelize = new Sequelize(
    config.dev.datatbase,
    config.dev.username,
    config.dev.password,
    config.dev
);

const db = {}; // exports할것들의 집합 객체를 미리 만들어놈
db.sequelize = sequelize;

module.exports = db;
