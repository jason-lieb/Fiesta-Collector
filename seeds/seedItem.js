const { Item } = require('../models');

const itemData = [
  {
    item_name: '',
    category_id: 0,
    start_year: 1900,
    end_year: 2023
  },
];

const seedItem = () => Item.bulkCreate(itemData);

module.exports = seedItem;