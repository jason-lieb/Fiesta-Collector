const Item = require('../models/Item');

exports.get = async (req, res) => {
  try {
    const items = await Item.findAll();
    const serializedData = items.map((data) => data.get({ plain: true }));
    res.render('home', { serializedData });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create function for get one item
exports.getOne = () => {
  console.log('get one');
};
