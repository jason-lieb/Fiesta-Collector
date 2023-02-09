const { Inventory } = require('../models');

const inventoryData = [
  {
    user_id: 0,
    item_id: 0,
    color_id: 0,
    quantiy: 0
  },
];

const seedInventory = () => Inventory.bulkCreate(inventoryData);

module.exports = seedInventory;