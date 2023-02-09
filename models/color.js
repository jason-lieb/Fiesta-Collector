const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Color extends Model {}

Color.init({
  //
},
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'colors',
})

module.exports = Color;