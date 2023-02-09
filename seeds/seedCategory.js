const { Category } = require('../models');

const categoryData = [
  {
    category_name: '',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;