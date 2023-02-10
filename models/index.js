const User = require('./User');
const Inventory = require('./Inventory');
const Category = require('./Category');
const Item = require('./Item');
const Color = require('./Color');

// One (Category) to Many (Item) Association
Item.belongsTo(Category, {
  foreignKey: 'category_id',
});

Category.hasMany(Item, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// One (Item) to Many (Inventory) Association
Inventory.belongsTo(Item, {
  foreignKey: 'item_id',
});

Item.hasMany(Inventory, {
  foreignKey: 'item_id',
  onDelete: 'CASCADE',
});

// One (Color) to Many (Inventory) Association
Inventory.belongsTo(Color, {
  foreignKey: 'color_id',
});

Color.hasMany(Inventory, {
  foreignKey: 'color_id',
  onDelete: 'CASCADE',
});

// One (User) to Many (Inventory) Association
Inventory.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Inventory, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

module.exports = { User, Inventory, Category, Item, Color };
