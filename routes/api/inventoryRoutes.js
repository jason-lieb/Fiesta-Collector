const router = require('express').Router();
const { Inventory, Item, User, Color } = require('../../models');
//localhost:5500/api/inventory/
router.get('/', async (req, res) => {
  try {
    const inventoryData = await Inventory.findAll({
      include: [User, Item, Color],
    });
    res.status(200).json(inventoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//localhost:5500/api/inventory/:id
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
//localhost:5500/api/inventory/:id
router.put('/:id', async (req, res) => {
  try {
    const inventoryData = await Inventory.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!inventoryData) {
      res.status(404).json({ message: 'No inventory with this id!' });
      return;
    }
    res.status(200).json(inventoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//localhost:5500/api/inventory/:id
router.delete('/:id', async (req, res) => {
  try {
    const inventoryData = await Inventory.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!inventoryData) {
      res.status(404).json({ message: 'No inventory with this id!' });
      return;
    }
    res.status(200).json(inventoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
