const router = require('express').router

const apiRoutes = require('./api')

router.use('/api', apiRoutes)

module.exports = router