const dot = require("dotenv").config();

// 데이터 베이스 접속에 필요한 설정값 객체
const config = {
  dev: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "test",
    host: "127.0.0.1", // 여기에 만약 우리가 AWS RDS 쓰거나 지원 데이터 베이스등등
    // 사용을 한다면 이곳에 주소를 넣어주면 됩니다.
    dialect: "mysql",
  },
};
// const config2 = {
//   dev: {
//     username: "root",
//     password: process.env.DATABASE_PASSWORD,
//     database: "test",
//     host: "127.0.0.1", // 여기에 만약 우리가 AWS RDS 쓰거나 지원 데이터 베이스등등
//     // 사용을 한다면 이곳에 주소를 넣어주면 됩니다.
//     dialect: "mysql",
//   },
// };

// 여러개 내보낼때는 객체로 묶어서 내보내면 된다.
// module.exports = { config, config2 }; 이런식으로

module.exports = config;
