'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.DECIMAL
      },
      category: {
        type: Sequelize.TEXT
      },
      discount: {
        type: Sequelize.DECIMAL
      },
      stock: {
        type: Sequelize.INTEGER
      },
      stock_min: {
        type: Sequelize.INTEGER
      },
      stock_max: {
        type: Sequelize.INTEGER
      },
      bodegaId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Bodegas",
          key: "id"}
      },
      varietalId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Varietals",
          key: "id"}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      visitado: {
        type: Sequelize.TEXT
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};