const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Color extends Model {}

Color.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  color_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  end_year: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'colors',
})

module.exports = Color;