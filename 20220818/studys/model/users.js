const Sequelize = require("sequelize");
// Sequelize.Model을 확장한 user 클래스
class User extends Sequelize.Model {
  // static init 메서드에서 테이블 설정을 해주고
  static init(sequelize) {
    // super.init 함수 첫번째 매개변수는 테이블 컬럼에 대한 설정 두 번째는 테이블 자체에 대한 설정이다.
    // mysql : VARCHAR(100) == sequelize : STRING(100)
    // mysql : INT == sequelize : INTEGER
    // mysql : TINYINT == sequelize : BOOLEAN
    // mysql : DATETIME == sequelize : DATE

    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          // 고유 키
          // 값이 중복되지 않고
          // 중복되면 안되는 값들 주민등록 번호 같은
          // 반드시 값을 입력할 필요는 없다.
          unique: true,
          // 기본 키
          // primaryKey
          // 값이 중복되지 않고
          // 반드시 값을 입력해야한다.
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        msg: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        // sequelize : static init 함수의 매개변수를 연결 시키는 옵션
        // db.sequelize 객체를 넣기위해 index.js에서 넣어준다.
        sequelize,
        //timestamps : true로 하면 createdAt과 updatedAt 컬럼을 추가하고 생성시간과 수정시간을 자동으로 입력
        timestamps: false,
        // underscored : 시퀄라이즈는 기본적으로 테이블명과 컬럼명을 카멜 표기법으로 만들어주는데.
        // 스네이크 표기법으로 바꾸는 옵션이다 (예 updatedAt 을 updated_at 으로).
        underscored: false,
        // modelName : 모델 이름을 설정할 수 있다.
        modelName: "User",
        // tableName : 실제 데이터베이스의 테이블 이름. 보통 모델 이름의 소문자 및 복수형으로 만든다.
        // 이름이 User면 테이블 이름은 users 로 작성
        tableName: "users",
        // paranoid : true로 설정하면 deletedAt이라는 컬럼이 생긴다. 로우를 삭제할 때 완전히 지우지 않고,
        // deletedAt에 지운 시각이 기록된다. 로우를 조회하는 명령을 내렸을 경우 deletedAt의 값이
        // null인 로우를 조회한다. 이렇게 하는 이유는 후에 로우를 복원하기 위해서다.
        // 로우를 복원해야 할 상황이 생길 것 같다면 미리 true로 설정해두자.
        paranoid: false,
        // charset, collate : 각각 utf8 과 utf8_general_ci 로 설정해야 한글이 입력된다.
        // 이모티콘까지 입력할 수 있게 하고 싶다면 utf8mb4 와 utf8mb4_general_ci 를 입력한다.
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  // static associate 함수에서 다른 모델과의 관계를 적어준다.
  // MySQL에서는 JOIN이라는 기능으로 여러 테이블 간의 관계를 파악해 결과를 도출한다.
  // 시퀄라이즈는 JOIN 기능도 알아서 구현한다. 대신 테이블 간에 어떠한 관계가 있는지 시퀄라이즈에 알려줘야 한다.
  static associate(db) {
    // 1:N 관계 (hasMany, belongsTo)
    // 시퀄라이즈에서는 1:N 관계를 hasMany 메서드로 표현한다.
    // users 테이블의 로우 하나를 불러올 때 연결된
    // posts 테이블의 로우들도 같이 불러올 수 있다. 반대로 belongsTo 메서드도 있다.
    // 이는 posts 테이블의 로우를 불러올 때 연결된 users 테이블의 로우를 가져온다.
    db.User.hasMany(db.Post, { foreignKey: "user_id", sourceKey: "id" });
    // 간단히 User가 많은 댓글을 가질 수 있으니 User.hasMany가 되는 것이고,
    // Comment는 한 User에 속할 수 있으니 Comment.belongsTo가 되는 것이다.
    // 둘이 소통하는 키는 foreignKey인 commenter이며, User의 sourceKey는 곧 Commenter의 targetKey가 된다
    // (hasMany에서는 sourceKey, belongsTo에서는 targetKey). foreignKey를 따로 지정하지 않는다면
    // 이름이 모델명+기본 키인 컬럼이 모델에 생성된다. 즉, 예를 들어 위 예제에서 commenter를 foreignKey로
    // 직접 넣어주지 않았다면 모델명인 user과 기본 키인 id가 합쳐진 UserId가 foreignKey로 생성된다.

    // 1:1 관계 (hasOne, belongsTo)
    // 1:1 관계에서는 hasMany 대신 hasOne을 사용한다. foriegnKey, sourceKey, targetKey의 사용법은 1:N 관계와 같다.
    // 1:1 관계라고 하더라도 belongsTo와 hasOne이 반대이면 안된다. belongsTo를 사용하는 Info 모델에 UserId 컬럼을 추가되기 때문이다.

    // N:M 관계 (belongsToMany)
    // 시퀄라이즈에는 N:M 관계를 belongsToMany 메서드로 표현한다.
    // 이 경우엔 어느 한 테이블이 어느 다른 테이블에 종속되는 관계가 아니다.
    // 이 경우에, 예를 들어 Post 모델과 Hash 모델이 있다고 할 때, 다음과 같이 표현할 수 있다.
    // N:M 관계의 특성상 새로운 모델이 다음과 같이 생성되며,
    // through 속성에 그 이름을 적으면 된다. 새로 생성된 PostHash 모델에는 게시글과 해시태그의 아이디가 저장된다.
    // Post
    // db.Post.belongsToMany(db.Hash, { through: 'PostHash' });
    // Hash
    // db.Hash.belongsToMany(db.Post, { through: 'PostHash' })
  }
}

module.exports = User;
