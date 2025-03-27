const { DataTypes } = require("sequelize");
const sequelize = require('../../config/db')
const Company=require("../auth/models/Company")
const Banner = sequelize.define('Banner', {
    title: {
      type: DataTypes.STRING,
      allowNull:true
    },
    bannerNumber:{
        type: DataTypes.STRING,
        allowNull: true
      },
      bannerAddress:{
        type: DataTypes.STRING,
        allowNull: true
      },
      imageUrl: {
        type: DataTypes.TEXT,
        allowNull: true
      },
    uniqueCode:{
        type:DataTypes.STRING,
        allowNull:false
    },
    createdDate:{
      type:DataTypes.STRING,
      allowNull:true
  },
    rentDays:{
      type:DataTypes.STRING,
      allowNull:true
  },
    expiredDate:{
      type:DataTypes.STRING,
      allowNull:true
  },

  bannerLatitude:{
    type:DataTypes.STRING,
    allowNull:false
},

  bannerLongitude:{
    type:DataTypes.STRING,
    allowNull:false
},
isSocialAD: {
  type:DataTypes.BOOLEAN,
  allowNull:true
},
isContainProhibitedAD: {
  type:DataTypes.BOOLEAN,
  allowNull:true
},
categoryOfStreet: {
  type:DataTypes.STRING,
  allowNull:true
},
typeOfAdObject: {
  type:DataTypes.STRING,
  allowNull:true
},
viewOfAd: {
  type:DataTypes.STRING,
  allowNull:true
},
tariff: {
  type:DataTypes.STRING,
  allowNull:true
},
countOfSides: {
  type:DataTypes.INTEGER,
  allowNull:true
},

  
    // Другие поля баннера
  });
  
  // Установите связь "многие ко многим" между Company и Banner
  Company.hasMany(Banner);
  Banner.belongsTo(Company);
  
  module.exports = Banner;