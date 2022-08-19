const Sequelize = require("sequelize");
// User 클래스에서 시퀄라이즈 안에 모듈 객체의 기능을 상속시켜주기 위해서
// User 클래스에 Sequelize.Model 기능을 상속시켜준다.
class User extends Sequelize.Model {
    // static init 매서드에서 테이블을 생성해주는건데
    // 사용하면 테이블을 생성 및 연결까지(매핑) 구성
    static init(db) {
        // 상속받은 함수(부모의 함수)를 쓰려면 super를 사용해야함

        // init함수에 들어가는 첫번째 인수는 테이블의 구성
        // 컬럼이 뭐뭐있는지 그 타입과 속성이 뭔지
        // 여기에 정리해서 테이블 생성 및 매핑해줌

        // 두번째 인수는 테이블 자체에 대한 설정값을 객체로 전달
        return super.init(
            {
                // name 이라는 이름의 컬럼 추가
                name: {
                    // 시퀄라이즈 모델 안에있는 데이터 타입을 사용해야한다.
                    // 그래서 가져온 시퀄라이즈 모듈 안에 있는 STRING 객체를 사용
                    type: Sequelize.STRING(20),
                    // 해당컬럼에 값이 무조건 들어가야하는지 정하는부분
                    allowNull: false,
                    unique: true,
                    // 고유키
                    // 여기서는 name컬럼의 값이 중첩되지 않도록 사용
                    // 주민번호나 전화번호 겹쳐지면 안되는 값들에 사용한다.

                    // primaryKey: true,
                    // 기본키로 설정을 할것인지
                    // 기본키는 테이블당 하나는 무조건 있어야한다.
                    // 기본키는 값이 중복이 안된다
                },
                // 나이 컬럼
                age: {
                    // 나이의 값은 숫자로 받을거니까
                    type: Sequelize.INTEGER,
                    // 없으면 안돼
                    allowNull: false,
                },
                // 메세지 컬럼
                msg: {
                    // 문자로 받을거니까
                    type: Sequelize.TEXT,
                    // 굳이 안써도 된다.
                    allowNull: true,
                    // defaultValue: "dfsr" 이러면 default로 들어가는 값을 설정가능
                },
                // 생성시간이 필요할경우엔 밑에같이쓰던가 밑에 timestamps: true 설정을 하면 된다.
                // created_at: {
                //     // 시간타입으로 받고
                //     type: Sequelize.DATE,
                //     allowNull: false,
                //     defaultValue: Sequelize.NOW,
                // },
            },
            {
                // sequelize 이건 위에서 매변수 쓴걸 연결시켜주는 옵션
                db,
                // timestamps 는 생성시간뿐만 아니라 업데이트 시간도 생성해줌
                timestamps: true,
                // underscored 시퀄라이즈는 timestamp의 표기법임. 디폴트가 카멜표기법, true로하면 스네이크표기법
                underscored: false,
                // modelName은 모델의 이름을 설정할수 있다.
                modelName: "User", // 모델네임은 관계형으로 구성할때 사용되는 것
                tableName: "users", //테이블의 이름 설정해주는거
                // paranoid true로 설정하면 deletedAt 이라는 삭제시간이 기록되는 컬럼이 추가됨
                // 해당 데이터를 지우더라도 완전히 삭제되지않고 삭제된 시간이 추가된다.
                paranoid: false,
                // 밑에 두개 설정해주면 한글입력이 가능하게 되고,
                // 이모티콘 쓸려면 utf8 뒤에 mb4만 붙여주면 된다.
                // 글자가 깨진다면 밑의 인코딩방식의 문제임으로 여기를 수정해줘야 한다.
                charset: "utf-8",
                collate: "utf8_general_ci",
            }
        );
    }
}

module.exports = User;
