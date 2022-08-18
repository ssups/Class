const dot = require("dotenv").config();

const config = {
    dev: {
        username: "root",
        password: process.env.DATABASE_PASSWORD,
        database: "test11",
        host: "127.0.0.1",
        dialect: "mysql",
    },
};

module.exports = config;
