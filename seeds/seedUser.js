const { User } = require('../models');

const userData = [
  {
    name: 'Test',
    email: 'test@email.com',
    password: '$2b$10$ehuquO78kuIg04Kx7Ghdbe3DmaO7Sp1qbes6LGLzvRmy0pmPV6aE6' // test1234 after hashing
  },
  {
    name: 'Test2',
    email: 'test2@email.com',
    password: '$2b$10$ehuquO78kuIg04Kx7Ghdbe3DmaO7Sp1qbes6LGLzvRmy0pmPV6aE6' // test1234 after hashing
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;