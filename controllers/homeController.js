const { Inventory, User, Color, Item, Category } = require('../models');

exports.get = async (req, res) => {
  try {
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
      // where: { user_id: req.session.user_id },
    });
    const dataForInventory = inventoryObjects.map((data) =>
      data.get({ plain: true })
    );
    const nameOfUser =
      dataForInventory.length > 1
        ? dataForInventory[0].user.name
        : dataForInventory.user.name;
    const inventory = dataForInventory.map((data) => {
      return {
        page: 'home',
        // user_name: data.user.name,
        item_name: data.item.item_name,
        color_name: data.color.color_name,
        category_name: data.item.category.category_name,
        quantity: data.quantity,
      };
    });
    res.render('home', { inventory, name: nameOfUser });
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
