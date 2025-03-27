const { DataTypes } = require("sequelize");
const sequelize = require('../../config/db')
const Company=require("../auth/models/Company")
const Banner=require('../banner/Banner')
const User=require('../auth/models/User')

const Revise = sequelize.define('Revise', {
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Не проверен',
  },
 
  expiredDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  image:{
  type: DataTypes.STRING,
  allowNull: true,
  },
  description:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Нет описания',
  },
  BannerId:{
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  UserId:{
    type: DataTypes.STRING,
    allowNull: false,
    
  },

  moderatorStatus:{
    type: DataTypes.STRING,
    allowNull: false,
    
  },

  moderatorAnswer:{
    type: DataTypes.STRING,
    allowNull: false,
    
  },


  
    // Другие поля баннера
  });
  
  // Установите связь "многие ко многим" между Company и Banner
Revise.belongsTo(Banner);
Revise.belongsTo(User);


  
module.exports = Revise;