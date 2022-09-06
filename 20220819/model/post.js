const Sequelize = require("sequelize");

class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                msg: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
            },
            {
                sequelize: sequelize,
                timestamps: true,
                modelName: "Post",
                tableName: "posts", // 보통 테이블이름은 소문자로 시작하고 뒤에 s를 붙힌다.
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }
    static associate(db) {
        // belongsTo 함수를 사용해서 User 테이블과 연결 (이 테이블이 자식 테이블)
        db.Post.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });
    }
}

module.exports = Post;
