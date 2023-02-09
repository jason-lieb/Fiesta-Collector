const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Inventory extends Model {}

Inventory.init({
  //
},
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'inventory',
})

module.exports = Item;