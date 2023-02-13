//import and use all app api routes
const router = require('express').Router();
const categoryRoutes = require('./categoryRoutes');
const colorRoutes = require('./colorRoutes');
const inventoryRoutes = require('./inventoryRoutes');
const itemRoutes = require('./itemRoutes');
const userRoutes = require('./userRoutes');
//localhost:5500/api/category
router.use('/category', categoryRoutes);
//localhost:5500/api/color
router.use('/color', colorRoutes);
//localhost:5500/api/inventory
router.use('/inventory', inventoryRoutes);
//localhost:5500/api/item
router.use('/item', itemRoutes);
//localhost:5500/api/user
router.use('/user', userRoutes);

module.exports = router;
