const { User } = require('../models');

exports.get = (req, res) => {
  res.render('signUp');
};

exports.post = async (req, res) => {
  try {
    const userInfo = await User.create(req.body);
    res.status(200).json(userInfo);
  } catch (err) {
    res.status(500).json(err);
  }
};
