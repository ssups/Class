const dot = require("dotenv").config();
const config = {
    dev: {
        user: "root",
        password: process.env.DB_PASSWORD,
        database: "test9",
        multipleStatement: true,
    },
};
module.exports = config;
