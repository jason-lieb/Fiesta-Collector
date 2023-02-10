const router = require('express').Router();
const { User } = require('../models');

router.get('/signUp', (req, res) => {
  res.render('signUp');
});

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/home', (req, res) => {
  res.render('home');
});

router.post('/signUp', async (req, res) => {
  try {
    const userInfo = await User.create({
      name: req.body.nameFromFrontEnd,
      email: req.body.emailFromFrontEnd,
      password: req.body.passwordFromFrontEnd,
    });
    res.status(200).json(userInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
