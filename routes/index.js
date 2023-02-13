// Imports
const router = require('express').Router();

const signUpController = require('../controllers/signUpController');
const logInController = require('../controllers/logInController');
const browseController = require('../controllers/browseController');
const homeController = require('../controllers/homeController');

const middleware = require('../utils/authMiddleware');

const apiRoutes = require('./api');

//localhost:5500/api
router.use('/api', apiRoutes);

//localhost:5500/signup
router.get('/signup', signUpController.get);
router.post('/signup', signUpController.post);

//localhost:5500/login
router.use('/login', logInController.redirect);
router.get('/login', logInController.get);
router.post('/login', logInController.post);

// Middleware - redirect to login if not logged in
router.use(middleware.auth);

//localhost:5500/browse
router.get('/browse', browseController.get);
router.get('/browse/:id', browseController.getOne);
router.post('/browse', browseController.postOne);

//localhost:5500/
router.get('/', homeController.get);

module.exports = router;
