const router = require('express').Router();
const { Inventory, Item, User, Color } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const inventoryData = await Inventory.findAll({
      include: [{ model: Item }, { model: User }, { model: Color }],
    });
    res.status(200).json(inventoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const inventoryData = await Inventory.findByPk(req.params.id, {
      include: [User, Item, Color],
    });
    if (!inventoryData) {
      res.status(404).json({ message: 'No inventory found with that id' });
    }
    res.status(200).json(inventoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
