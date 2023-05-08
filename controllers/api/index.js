//requiring express router for managing routes
const router = require('express').Router();

//creating userRoutes
const userRoutes = require('./userRoutes');
const plantRoutes = require('./plantRoutes');
const locationRoutes = require('./locationRoutes');
const locatedPlantRoutes = require('./locatedPlantRoutes');

router.use('/user', userRoutes);
router.use('/plant', plantRoutes);
router.use('/location', locationRoutes);
router.use('/locatedplants', locatedPlantRoutes);

//exporting module
module.exports = router;
