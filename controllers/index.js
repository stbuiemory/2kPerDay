//requiring express router for managing routes
const router = require('express').Router();

//creating apiRoutes
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/login', loginRoute);
router.use('/logout', logoutRoute);
router.use('/mygarden', myGardenRoute);
router.use('/addplant', addPlant);

//exporting module
module.exports = router;
