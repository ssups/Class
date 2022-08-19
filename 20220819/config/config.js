const dot = require("dotenv").config();

// 데이터 베이스 접속 필요한 설정값 객체
const config = {
    dev: {
        username: "root",
        password: process.env.DATABASE_PASSWORD,
        datatbase: "test",
        host: "localhost", // 여기에 만약 우리가 AWS RDS를 쓰거나 다른 비스무리한거 쓰면
        // 이곳에 주소를 넣어주면 된다.
        dialect: "mysql",
    },
};
const config2 = {
    dev: {
        username: "root",
        password: process.env.DATABASE_PASSWORD,
        datatbase: "test",
        host: "localhost", // 여기에 만약 우리가 AWS RDS를 쓰거나 다른 비스무리한거 쓰면
        // 이곳에 주소를 넣어주면 된다.
        dialect: "mysql",
    },
};

module.exports = { config, config2 };
