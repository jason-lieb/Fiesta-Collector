const User = require('./user');
const Inventory = require('./inventory');
const Category = require('./category');
const Item = require('./item');
const Color = require('./color');

// One (Category) to Many (Item) Association
Item.belongsTo(Category, {
  foreignKey: 'category_id'
})

Category.hasMany(Item, {
  foreignKey: 'category_id'
})

// Many (User) to Many (Item) Association
User.belongsToMany(Item, {
  through: Inventory,
  foreignKey: 'user_id'
})

Item.belongsToMany(User, {
  through: Inventory,
  foreignKey: 'item_id'
})

// Many (Color) to Many (Item) Association
Color.belongsToMany(Item, {
  through: Inventory,
  foreignKey: 'color_id'
})

Item.belongsToMany(Color, {
  through: Inventory,
  foreignKey: 'item_id'
})

module.exports = { User, Inventory, Category, Item, Color };