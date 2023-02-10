const router = require('express').Router();
const { Item } = require('../../models');

//localhost:5500/api/items
router.get('/items', async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
