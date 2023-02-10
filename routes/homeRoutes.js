const router = require('express').Router();
const { User, Item } = require('../models');

router.get('/signUp', (req, res) => {
  res.render('signUp');
});

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/home', async (req, res) => {
  try {
    const items = await Item.findAll();
    const serializedData =items.map((data) => data.get({plain: true}));
    res.render("home", {serializedData});
    //res.status(200).json(items);
  } catch (err) {
    res.status(500).json(err);
  }
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
