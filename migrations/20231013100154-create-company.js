'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isUR:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
      
    },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      bin: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
  
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        
      },
      
      contactPhone:{
        type: Sequelize.STRING,
        allowNull: false,
     },
    
     contactEmail: {
      type: Sequelize.STRING,
      allowNull: false,
      },



    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Companies');
  }
};