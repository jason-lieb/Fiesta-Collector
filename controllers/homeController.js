const { Inventory, User, Color, Item, Category } = require('../models');

exports.get = async (req, res) => {
  try {
    // Query all of inventory for user
    const inventoryObjects = await Inventory.findAll({
      include: [
        { model: User, attributes: ['name'] },
        { model: Color, attributes: ['color_name'] },
        {
          model: Item,
          attributes: ['id', 'item_name'],
          include: [{ model: Category, attributes: ['category_name'] }],
        },
      ],
      where: { user_id: req.session.user_id },
    });
    if (inventoryObjects.length > 0) {
      const dataForInventory = inventoryObjects.map((data) =>
        data.get({ plain: true })
      );
      // Grab name of user to pass to handlebars
      const nameOfUser = dataForInventory[0].user.name;
      const imagesNotAvailable = [
        // 1, 2, 21, 23, 24, 27, 28, 30, 31, 32, 46, 51, 52, 53, 64,
      ];
      const inventory = dataForInventory.map((data) => {
        return {
          page: 'home',
          id: data.id,
          item_name: data.item.item_name,
          item_id: data.item.id,
          item_has_pic: !imagesNotAvailable.includes(data.item.id),
          color_name: data.color.color_name,
          category_name: data.item.category.category_name,
          quantity: data.quantity,
        };
      });
      // Create list of distinct categories for user's collections
      const categories = new Set();
      dataForInventory.forEach((data) =>
        categories.add(data.item.category.category_name)
      );
      // Create list of distinct colors for user's collections
      const colors = new Set();
      dataForInventory.forEach((data) => colors.add(data.color.color_name));
      // Create list of distinct colors for user's collections
      const items = new Set();
      dataForInventory.forEach((data) => items.add(data.item.item_name));
      // Pass all info to handlebars
      res.render('home', {
        inventory,
        categories,
        colors,
        items,
        name: nameOfUser,
        home: true,
      });
    } else {
      const userNameObject = await User.findByPk(req.session.user_id);
      const nameOfUser = userNameObject.dataValues.name;
      res.render('home', {
        name: nameOfUser,
        home: true,
      });
    }
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
// get items where inventory user id = user from session
// get categories where id = category id from inventory items where user_id = id from session
// get colors where id = color id from inventory items where user_id = id from session

// Add later if time allows
// cookie for how many results per page?
// page number we're on?
// get years?
// get year codes?
