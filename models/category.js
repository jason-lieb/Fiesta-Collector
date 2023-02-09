const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Category extends Model {}

Category.init({
  //
},
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'categories',
})

module.exports = Category;