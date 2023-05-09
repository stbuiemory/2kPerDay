const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');
// see line 24 for use
// const bcrypt = require('bcrypt');

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
});

// LOG IN existing user (FIND USER BY USERNAME AND CHECK PASSWORD)
router.get('/login', withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
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
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });

      res.render('main', {
        user,
        logged_in: req.session.logged_in,
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// LOG OUT user and end session
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