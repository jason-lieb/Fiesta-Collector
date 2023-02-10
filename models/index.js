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

// Many (User) to Many (Item) Association
User.belongsToMany(Item, {
  through: {
    model: Inventory,
    unique: false,
  },
  foreignKey: 'user_id',
});

Item.belongsToMany(User, {
  through: {
    model: Inventory,
    unique: false,
  },
  foreignKey: 'item_id',
});

// Many (Color) to Many (Item) Association
Color.belongsToMany(Item, {
  through: {
    model: Inventory,
    unique: false,
  },
  foreignKey: 'color_id',
});

Item.belongsToMany(Color, {
  through: {
    model: Inventory,
    unique: false,
  },
  foreignKey: 'item_id',
});

module.exports = { User, Inventory, Category, Item, Color };
