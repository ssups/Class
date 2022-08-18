// mysql 편하게 쓰기
// swquelize 사용 그리고 FOREIGN KEY 사용
// 관계형 데이터 베이스 만들어보기

// 지금 사용할 모듈 mysql2
const mysql = require("mysql2");
// config.js에서 내보낸 객체가 담긴다
const config = require("./config");

mysql.createConnection(config.dev);
