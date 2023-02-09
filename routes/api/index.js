//import and use all app api routes
const router = require('express').Router();
const categoryRoutes = require('./categoryRoutes');
const colorRoutes = require('./colorRoutes');
const inventoryRoutes = require('./inventoryRoutes');
const itemRoutes = require('./itemRoutes');
const userRoutes = require('./userRoutes');

router.use('/category', categoryRoutes);
router.use('/color', colorRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/item', itemRoutes);
router.use('/user', userRoutes);

module.exports = router;