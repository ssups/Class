const dot = require("dotenv").config();
const config = {
    dev: {
        user: "root",
        password: process.env.DB_PASSWORD,
        database: "test9",
        multipleStatement: true,
    },
    dev2: {
        user: "root",
        password: process.env.DB_PASSWORD,
        database: "test10",
        // 호스트 주소
        host: "127.0.0.1",
        dialect: "mysql",
    },
};
module.exports = config;
