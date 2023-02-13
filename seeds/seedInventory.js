const { Inventory } = require('../models');

const inventoryData = [
  { user_id: 1, item_id: 6, color_id: 22, quantity: 2 },
  { user_id: 1, item_id: 14, color_id: 37, quantity: 4 },
  { user_id: 1, item_id: 15, color_id: 26, quantity: 2 },
  { user_id: 1, item_id: 59, color_id: 25, quantity: 1 },
  { user_id: 1, item_id: 60, color_id: 11, quantity: 5 },
  { user_id: 1, item_id: 67, color_id: 13, quantity: 1 },
  { user_id: 2, item_id: 6, color_id: 22, quantity: 67 },
  { user_id: 2, item_id: 14, color_id: 37, quantity: 67 },
  { user_id: 2, item_id: 15, color_id: 26, quantity: 67 },
  { user_id: 2, item_id: 59, color_id: 25, quantity: 67 },
  { user_id: 2, item_id: 60, color_id: 11, quantity: 67 },
  { user_id: 2, item_id: 67, color_id: 13, quantity: 67 },
];

const seedInventory = () => Inventory.bulkCreate(inventoryData);

module.exports = seedInventory;