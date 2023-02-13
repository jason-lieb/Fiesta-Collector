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
          attributes: ['item_name'],
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
      const nameOfUser =
        dataForInventory.length > 1
          ? dataForInventory[0].user.name
          : dataForInventory.user.name;
      const inventory = dataForInventory.map((data) => {
        return {
          page: 'home',
          item_name: data.item.item_name,
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
