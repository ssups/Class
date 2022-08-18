const Sequelize = require("sequelize");
// sequelize 모듈을 확장한 user 클래스
class User extends Sequelize.Model {
    // init 함수로에서 테이블을 설정해 준다.
    static init(sequelize) {
        // super.init 함수의 첫번째 매개변수는 테이블 컬럼에 대한 설정
        // 두번째는 테이블 자체의 설정
        return super.init(
            {
                name: {
                    type: Sequelize.STRING(50),
                    // Null 허용 X
                    allowNull: false,
                    unique: true,
                    // 고유키
                    // 값이 중복되지 않고
                    // 중복되면 않되는 값들을 쓸때 사용합니다.
                    // 반드시 입력할 필요는 없다.(null허용 안할땐 써야함)

                    // primarykey
                    // 기본키
                    // 값이 중복되지 않고
                    // 반드시 입력해야하는 값
                },
                age: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                msg: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
            },
            // 여기부터가 테이블에 대한 설정
            {
                // sequelize: init함수의 매개변수를 연결시켜주는 옵션
                sequelize,
                // timestamps: true로 하면 createdAt과 updatedAt 이 컬럼들을 추가해주고
                // 생성 시간과 수정시간을 자동으로 입력해준다.
                timestamps: true,
                // underscored: sequelize는 테이블명과 컬럼명을 카멜표기법으로 표시해준는데
                // 스테이크 표기법으로 바꾸주는 옵션
                underscore: false,
                // modelName: 모델의 이름을 설정할수있다.
                modelName: "User",
                // tableName: 실제로 데이터베이스에 등록되는 이름, 보통 모델의 소문자로
                // 복수형으로 만들어준다. users
                tableName: "users",
                // paranoid: true로 설정하면 deletedAt이라는 컬럼도 추가된다.
                // 따라서 컬럼을 삭제할 경우 컬럼자체가 지워지는 것이 아니라 삭제한 시간이 표시된다.
                // 검색했을때도 찾지는 않는다.
                // 삭제하더라도 값을 남겨둬야 할때, 복원시켜야 할 값일때 사용
                paranoid: false,
                // charset, collate : 각각 utf-8, utf_general_ci 이렇게 설정해줘야 한글입력이 가능하다.
                // 이모티콘도 사용하려면 utf8md4, utf8md4_general_ci 이렇게 설정해줘야 한다.
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }
    // associate 함수에서 다른 모델과 관계를 적어둔다.
    // mysql에서는  JOIN이라는 기능으로 여러 테이블간의 관계를 만들어준다.
    // sequelize는 테이블간의 관계성만 알려준다면 JOIN 기능도 알아서 구현한다.
    static associate(db) {}
}

module.exports = User;
