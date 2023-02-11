// Imports
const router = require('express').Router();

const signUpController = require('../controllers/signUpController');
const logInController = require('../controllers/logInController');
const browseController = require('../controllers/browseController');
const homeController = require('../controllers/homeController');

// const middleware = require('../utils/authMiddleware');

const apiRoutes = require('./api');

// API, Sign Up, and Log In Routes
router.use('/api', apiRoutes);

//localhost:5500/api/users/signup
router.get('/signup', signUpController.get);
router.post('/signup', signUpController.post);

//localhost:5500/api/users/login
router.get('/login', logInController.get);
router.post('/login', logInController.post);

// Middleware - redirect to login if not logged in
// router.use(middleware.auth); // Get middleware function working

// Browse and Home Routes
router.get('/browse', browseController.get);
router.get('/browse/:id', browseController.getOne);

router.get('/', homeController.get);

module.exports = router;
