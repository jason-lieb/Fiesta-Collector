const router = require('express').Router();
const { Item, Category } = require('../../models');

//localhost:5500/api/items
router.get('/', async (req, res) => {
  try {
    const items = await Item.findAll({
      include: Category,
    });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
