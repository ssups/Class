const Sequelize = require("sequelize");

class Item extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        item_name: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },
        writer: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT(),
          allowNull: false,
        },
        price: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        amount: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Item",
        tableName: "items",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
}

module.exports = Item;
