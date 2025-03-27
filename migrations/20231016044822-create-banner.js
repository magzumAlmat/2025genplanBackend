'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Banners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bannerNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bannerAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      imageUrl: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      uniqueCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdDate: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rentDays: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      expiredDate: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bannerLatitude: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bannerLongitude: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isSocialAD: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      isContainProhibitedAD: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      categoryOfStreet: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      typeOfAdObject: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      viewOfAd: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tariff: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      countOfSides: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      CompanyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Companies',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    await queryInterface.dropTable('Banners');
  },
};
