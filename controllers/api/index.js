//requiring express router for managing routes
const router = require('express').Router();

//creating userRoutes
const userRoutes = require('./userRoutes');
const plantRoutes = require('./plantRoutes');
const locationRoutes = require('./locationRoutes');

router.use('/user', userRoutes);
router.use('/plant', plantRoutes);
router.use('/location', locationRoutes);

//exporting module
module.exports = router;
