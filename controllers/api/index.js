//requiring express router for managing routes
const router = require('express').Router();

//creating userRoutes
const userRoutes = require('./userRoutes');
const plantRoutes = require('./plantRoutes');

router.use('/user', userRoutes);
router.use('/plant', plantRoutes);

//exporting module
module.exports = router;
