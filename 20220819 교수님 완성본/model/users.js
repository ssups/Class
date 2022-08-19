const Sql = require("sequelize");
// User 클래스에서 시퀄라이즈 안에 모듈 객체의 기능을 상속시켜주기위해서
// User 클래스에 Sql.Model 기능을 준다.
class User extends Sql.Model {
  // static init 메서드에서 테이블을 생성해주는건데
  // 사용하면 테이블을 생성 및 연결까지(매핑) 구성
  static init(sequelize) {
    // 상속받은 함수를 쓰려면
    // super 사용
    // init함수의 첫번째 매개변수가 태이블의 구성
    // 컬럼이 뭐뭐있는지 그 타입과 속성이 뭔지
    // 여기에 정리해서 테이블 생성 해줌 매핑해줌

    // 두번째 테이블 자체에 대한 설정값을 객체로 전달
    // 테이블 자료형 사이트
    // https://pjt3591oo.github.io/sequelizejs_translate/build/html/CoreConcepts/DateTypes.html
    return super.init(
      {
        // name 컬럼 하나
        name: {
          // 시퀄라이즈 모델 안에있는 데이터 타입을 사용해야한다. 꼭
          // 그래서 가져온 시퀄라이즈 모듈 안에 있는 STRING 객체를 사용
          // 여기서 한거는 컬럼의 데이터 타입을 정한것
          type: Sql.STRING(20),
          // 이 값이 무조건 있어야하는지 이 컬럼값이 없으면 안된다고 표시하는것.
          // false면은 없으면 안되.
          // true면은 없어도 되.
          allowNull: false,

          unique: true,
          // 고유키로 사용할 것 인지
          // 여기서는 컬럼에 name 값이 겹치지 않도록 사용
          // 주민번호나 전화번호 겹치지 않는 값들 혹여나 안겹치게
          // 중복되지 않는키
          // 우리가 쓰고 싶을때 쓰면됨

          // primaryKey: true,
          // 기본키로 설정을 할것인지
          // 중복되지 않는 키
          // 기본키는 컬럼에 하나는 무조건 있다.
        },
        // 나이 컬럼
        age: {
          // 나이의 값은 숫자로 받을거니까 INTEGER
          type: Sql.INTEGER,
          // 없으면 안돼
          allowNull: false,
        },
        // 메시지 컬럼
        msg: {
          // 문자로 받을거니까 TEXT
          type: Sql.TEXT,
          // 굳이 안써도 된다.
          allowNull: true,
        },
        // 생성한 시간이 필요하다 할때 사용하면 된다 이구문이나 테이블 자체에 timestamps : true 설정을 하거나.
        // createde_at: {
        //   // 시간타입으로 받고
        //   type: Sql.DATE,
        //   allowNull: false,
        //   // 기본 값 설정
        //   // NOW 지금 현재 시간
        //   defaultValue: Sql.NOW,
        // },
      },
      {
        //sequelize 이건 위에서 매개변수 쓴걸 연결 시켜주는 옵션
        // 이름은 무조건 sequelize로 설정
        sequelize,
        timestamps: true, // 좀더좋은게 업데이트된 시간도 표시 해줌 created_at 만 생기는게 아니라
        // updated_at도 생겨서 우리가 수정을 했을때 시간도 같이 기록해줌,
        // underscored 시퀄라이즈는 기본적으로 userData 카멜 표기법인데
        // 스네이크 표기법으로 바꿔주는 옵션 user_data
        // false로 했을때
        underscored: false, // created_at가  createdAt 이렇게 바뀐다.
        // 얘는 모델의 이름을 설정할수 있다.
        modelName: "User", // 관경형으로 구성할때 사용합니다.
        tableName: "users", // 데이터 베이스의 테이블의 이름을 설정한다.
        // paranoid true로 설정하면 deletedAt이라는 컬럼이 만들어집니다.
        // 컬럼값은 남아있고 deletedAt이 값에 삭제한 시간이 추가된다.
        paranoid: false,
        // charset, collate : 각각 밑에 처럼 설정해주면 한글이 입력 가능하게 되고.
        // 이모티콘 쓸려면 utf8 뒤에 mb4
        // 가나다 ㄱㅏㄴㅏㄷㅏ 인코딩 방식
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  // (foreignkey) 외래키
  static associate(db) {
    // 1:N 관계 (hasMany, belongsTo)
    // 시퀄라이즈에서 1:N 관계를 hasMany 함수로 정의를 한다.
    // hasMany 함수를 이용해서 테이블의 관계를 정의해준다.
    // 첫번째 매개변수로 연결할 테이블
    // sourceKey User테이블안에 무슨 키를 foreignKey와 연결할지
    // hasMany()첫번째로 넘겨준 테이블이 foreignKey 연결되고 foreignKey 이름은 user_id다.
    db.User.hasMany(db.Post, { foreignKey: "user_id", sourceKey: "id" });
  }
}

module.exports = User;
