const { Item, Category, Color, Inventory } = require('../models');

exports.get = async (req, res) => {
  try {
    // Query all items
    const itemObjects = await Item.findAll({ include: [{ model: Category }] });
    const dataForItems = itemObjects.map((data) => data.get({ plain: true }));
    const imagesNotAvailable = [];
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
    const imagesNotAvailable = [];
    const colorObjects = await Color.findAll();
    const colors = colorObjects.map(
      (data) => data.get({ plain: true }).color_name
    );
    res.render('item', {
      item,
      item_has_pic: !imagesNotAvailable.includes(item.id),
      colors,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.postOne = async (req, res) => {
  try {
    const item_id = +req.params.id;
    const user_id = req.session.user_id;
    const color = await Color.findAll({
      where: { color_name: req.body.color },
    });
    const color_id = color[0].get({ plain: true }).id;
    const quantity = +req.body.qty;
    const createData = { user_id, item_id, color_id, quantity };
    const inventoryData = await Inventory.create(createData);
    res.status(200).json(inventoryData);
  } catch (err) {
    res.status(500).json(err);
  }
};
