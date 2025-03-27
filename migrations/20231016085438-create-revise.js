'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Revises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Не проверен',
      },
      expiredDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Нет описания',
      },
      BannerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Banners', // Update with the actual name of your Banner model
          key: 'id',
        },
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Update with the actual name of your User model
          key: 'id',
        },
      },
      moderatorStatus: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Не проверен',
      },
      moderatorAnswer: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Нет описания',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Revises');
  },
};
