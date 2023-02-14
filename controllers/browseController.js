const { Item, Category, Color } = require('../models');

exports.get = async (req, res) => {
  try {
    // Query all items
    const itemObjects = await Item.findAll({ include: [{ model: Category }] });
    const dataForItems = itemObjects.map((data) => data.get({ plain: true }));
    const imagesNotAvailable = [
      1, 2, 21, 23, 24, 27, 28, 30, 31, 32, 46, 51, 52, 53, 64,
    ];
    const items = dataForItems.map((data) => {
      return {
        item_id: data.id,
        item_name: data.item_name,
        item_has_pic: !imagesNotAvailable.includes(data.id),
        category_name: data.category.category_name,
      };
    });
    // Query all categories
    const categoryObjects = await Category.findAll();
    const categories = categoryObjects.map(
      (data) => data.dataValues.category_name
    );
    // Query all colors
    const colorObjects = await Color.findAll();
    const colors = colorObjects.map((data) => data.dataValues.color_name);
    res.render('browse', {
      items,
      categories,
      colors,
      browse: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getOne = async (req, res) => {
  try {
    const itemObject = await Item.findByPk(req.params.id);
    const item = itemObject.get({ plain: true });
    const imagesNotAvailable = [
      1, 2, 21, 23, 24, 27, 28, 30, 31, 32, 46, 51, 52, 53, 64,
    ];
    res.render('item', {
      item,
      item_has_pic: !imagesNotAvailable.includes(item.id),
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.postOne = async (req, res) => {
  try {
    const inventoryData = await Inventory.create(req.body);
    console.log(inventoryData);
    res.status(200).json(inventoryData);
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
