const {DataTypes} = require('sequelize')
const sequelize = require('../../../config/db')

const AuthCode = sequelize.define('AuthCode', {
  email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  link:{
    type: DataTypes.STRING,
    allowNull: true,
  },

  valid_till:{
    type: DataTypes.DATE,
    allowNull: false,
  },
},{
  timestamps:false,}
)


module.exports = AuthCode;
