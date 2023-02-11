const Item = require('../models/Item');

exports.get = async (req, res) => {
  try {
    const itemObjects = await Item.findAll();
    const items = itemObjects.map((data) => data.get({ plain: true }));
    res.render('browse', { items });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getOne = async (req, res) => {
  try {
    const itemObject = await Item.findByPk(req.params.id);
    const item = itemObject.get({ plain: true });
    res.render('item', item);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Session example
// res.render('homepage', {
//   galleries,
//   loggedIn: req.session.loggedIn,
// });

// Pseudo Code
// pass in which page we're on (your collection or browse)
// get all items
// get all categories
// get all colors

// Add later if time allows
// cookie for how many results per page?
// page number we're on?
// get years?
// get year codes?
