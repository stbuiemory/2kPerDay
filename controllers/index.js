//requiring express router for managing routes
const router = require('express').router;

//creating apiRoutes
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

//exporting module
module.exports = router;
