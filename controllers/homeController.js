const { Inventory, User, Color, Item } = require('../models');

exports.get = async (req, res) => {
  try {
    const itemObjects = await Inventory.findAll({
      include: [User, Color, Item],
      // attributes: { include: ['item.item_name', 'color.color_name'] },
      // where: { user_id: req.session.user_id },
    });
    const dataForItems = itemObjects.map((data) => data.get({ plain: true }));
    console.log(dataForItems);
    const items = dataForItems.map((data) => {
      return {
        user_name: data.user.name,
        item_name: data.item.item_name,
        color_name: data.color.color_name,
        quantity: data.quantity,
      };
    });
    // console.log(items);
    res.render('home', { items });
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
// pass in name of user
// get items where inventory user id = user from session
// get categories where id = category id from inventory items where user_id = id from session
// get colors where id = color id from inventory items where user_id = id from session

// Add later if time allows
// cookie for how many results per page?
// page number we're on?
// get years?
// get year codes?
