const router = require('express').Router();
const { User } = require('../../models/User');
//const bcrypt = require('bcrypt');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
  res.render('partials/mygarden', { layout: 'main' });
});

// LOG IN existing user (FIND USER BY EMAIL AND CHECK PASSWORD)

/* router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/mygarden',
    failureRedirect: '/login',
  })
);*/

router.get('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // USE bcrypt.compare() to compare password provided at login [req.body.password] to the hashed pw [userData.password]
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
      res.render('partials/login', { layout: 'main' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// LOG OUT user and end session
router.post('/logout', (req, res) => {
  req.logOut();
  res.redirect('/logout');
  console.log('USER HAS LOGGED OUT');
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
