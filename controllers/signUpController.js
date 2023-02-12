const { User } = require('../models');

exports.get = (req, res) => {
  res.render('signUp');
};

exports.post = async (req, res) => {
  try {
    console.log(req.body);
    const userInfo = await User.create(req.body);
    res.status(200).json(userInfo); // redirect to login
  } catch (err) {
    console.log('error', err);
    res.status(500).json(err);
  }
};
