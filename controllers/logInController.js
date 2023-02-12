const { User } = require('../models');

exports.get = (req, res) => {
  res.render('logIn');
};

exports.post = async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.dataValues.id;
      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.redirect = (req, res, next) => {
  // If the user is logged in, redirect them to the home route
  if (req.session.loggedIn) {
    res.redirect('/');
  } else {
    next();
  }
};
