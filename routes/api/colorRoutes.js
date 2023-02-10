const router = require('express').Router();
const { Color } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const colors = await Color.findAll();
    res.status(200).json(colors);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
