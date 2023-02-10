const seedCategory = require('./seedCategory');
const seedColor = require('./seedColor');
const seedInventory = require('./seedInventory');
const seedItem = require('./seedItem');
const seedUser = require('./seedUser');

const sequelize = require('../config/connection');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedCategory();
  console.log('\n----- CATEGORIES SEEDED -----\n');
  await seedColor();
  console.log('\n----- COLORS SEEDED -----\n');
  await seedItem();
  console.log('\n----- ITEMS SEEDED -----\n');
  await seedUser();
  console.log('\n----- USERS SEEDED -----\n');
  await seedInventory();
  console.log('\n----- INVENTORY SEEDED -----\n');

  process.exit(0);
};

seedDatabase();