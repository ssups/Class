// sequelize 사용
// 설치
// npm i sequelize
const { sequelize } = require("./modle"); // 폴더명까지만 경로 적어주면 그안에있는 index.js 를 기본으로 찾아온다

// 처음에 연결할때 테이블들의 값을 초기화 할껀지 여부
// true면은 기존 테이블들을 초기화하고 false면 초기화하지 않는다.
sequelize
    .sync({ force: false })
    .then(() => {
        console.log("연결되었습니다.");
    })
    .catch(err => {
        console.log(err);
    });
