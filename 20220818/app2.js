// sequelize 사용
// 설치
// npm i sequelize
const { sequelize, User } = require("./modle"); // 폴더명까지만 경로 적어주면 그안에있는 index.js 를 기본으로 찾아온다
const { Op } = require("sequelize");

sequelize
    // force: 처음에 연결할때 테이블들의 값을 초기화 할껀지 여부
    // true면은 기존 테이블들을 초기화하고 false면 초기화하지 않는다.
    // 테이블값 한번 다 지우고싶으면 true로 한번 실행시키고 false로 다시 바꾼다음에 작업하면됨
    .sync({ force: false })
    .then(() => {
        console.log("연결되었습니다.");
    })
    .catch(err => {
        console.log(err);
    });

// 쿼리문으로  INSERT INTO 테이블 벨류 (?, ?, ?) 이렇게 썻던거를 sequelize방식으로
// User.create({
//     name: "안녕2",
//     age: 23,
//     msg: "하위하위~",
// });

// 조회쿼리문 select * from users 이래 썻던거를 sequelize방식으로
// where: 검색 조건 설정
// order: 생성 순서 정렬 DESC, ASC(내림차순, 오름차순) order: [['age','DESC]]
// limit: 조회활 갯수
// offset: 스킵할 갯수
// Op.gt: (greater than, 초과)
// Op.gte (greater than or equal to, 이상),
// Op.lt (less than, 미만),
// Op.lte (less than or equal to, 이하),
// Op.ne (not equal, 같지 않음),
// Op.or (or, 또는),
// Op.in (in, 배열 요소 중 하나),
// Op.notIn (not in, 배열 요소와 모두 다름) 등이 있다.
// DESC, ASC 이거는 자주 사용한다.
async function select() {
    const user = await User.findAll({
        // 여기는 검색조건
        where: {
            age: { [Op.gt]: 23 },
            [Op.or]: [{ age: { [Op.gt]: 23 } }, { name: "안녕2" }],
        },
        order: [["age", "ASC"]],
        // limit: 1,
    });
    const temp = user.map(el => {
        return el.dataValues;
    });
    console.log(temp);
}
// select();

// findOne 매서드는 findAll 매서드랑 구성은 같고 하나의 데이터만 가져온다.
// findOne은 검색조건을 꼭 넣어줘서 써야함

// 수정 쿼리문 sequelize방식으로
// User.update(
//     {
//         msg: "수정할 내용",
//     },
//     // 아이디가 1번인 애를 찾아서
//     {
//         where: { id: 1 },
//     }
// );

// 삭제 쿼리문 sequelize방식으로
User.destroy({
    where: { id: 1 },
});

// 관계 쿼리문(join) sequelize방식으로
