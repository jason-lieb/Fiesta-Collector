const { Category } = require('../models');

const categoryData = [
  { category_name: 'Anniversay Items' },
  { category_name: 'Bakeware' },
  { category_name: 'Bowls' },
  { category_name: 'Canisters and Crocks' },
  { category_name: 'Countertop Accessories' },
  { category_name: 'Cups, Mugs, and Saucers' },
  { category_name: 'Pitchers, Teapots, and Vases' },
  { category_name: 'Place Settings' },
  { category_name: 'Plates' },
  { category_name: 'Platters' },
  { category_name: 'Serveware' },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;