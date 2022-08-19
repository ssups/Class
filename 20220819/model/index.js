// index.js 는 model폴더 안에 테이블생성을 위한 js 파일들을 모아서 export 해주는 곳

const Sequelize = require("sequelize");
// console.log(Sequelize);

// config.js 에서 module.exports = config 로 내보내기를 하고
// 여기서 밑에방식으로 import
const { config, config2 } = require("../config/config.js");
const User = require("./users");
const Post = require("./post");

// 시퀄라이즈 객체 생성
const sequelize = new Sequelize(
    config.dev.datatbase,
    config.dev.username,
    config.dev.password,
    config.dev
);

const db = {}; // exports할것들의 집합 객체를 미리 만들어놈
// User도 내보내서 사용할 예정이라 키값에 추가해주고
db.sequelize = sequelize;
db.User = User;
db.Post = Post;

// 이 구문이 없으면 테이블이 생성되지 않는다.
User.init(sequelize);
Post.init(sequelize);
User.associate(db);
Post.associate(db);

// 보내고싶은 값을 다 넣은 객체를 내보냄
module.exports = db;
