//requiring express router for managing routes
const router = require('express').Router();

//creating apiRoutes
const apiRoutes = require('./api');

const app = express();

router.use('/api', apiRoutes);
router.use('/login', loginRoute);
router.use('/logout', logoutRoute);
router.use('/mygarden', myGardenRoute);
router.use('/addplant', addPlant);
router.use('/viewspecificplant', viewspecificPlant);

app.get('/login', (req, res) => {
  res.render('partials/login', { layout: 'main' });
});

app.get('/logout', (req, res) => {
  res.render('partials/', { layout: 'main' });
});

app.get('/mygarden', (req, res) => {
  res.render('partials/mygarden', { layout: 'main' });
});

app.get('/addplant', (req, res) => {
  res.render('partials/addplants', { layout: 'main' });
});

app.get('/viewspecificplant', (req, res) => {
  res.render('partials/viewspecificplant', { layout: 'main' });
});

//exporting module
module.exports = router;
