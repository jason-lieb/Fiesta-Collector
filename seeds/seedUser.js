const { User } = require('../models');

const userData = [
  {
    name: '',
    email: '',
    password: ''
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;