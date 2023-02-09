const { Color } = require('../models');

const colorData = [
  {
    color_name: '',
    start_year: 1900,
    end_year: 2023
  },
];

const seedColor = () => Color.bulkCreate(colorData);

module.exports = seedColor;