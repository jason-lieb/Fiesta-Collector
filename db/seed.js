const sequelize = require('../config/connection');
const { User, Inventory, Category, Item, Color } = require('../models');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // await User.bulkCreate(userData, {});

  process.exit(0);
};

seedDatabase();