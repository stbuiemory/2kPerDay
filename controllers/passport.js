const { authenticate } = require('passport');
const bcrypt = require('bcrypt');

const localStrategy = require('passport-local').Strategy;

function initialize(passport, getUserByUsername) {
  const authenticateUser = (username, password, done) => {
    const user = getUserByUsername(username);

    if (user === null) {
      return done(null, false, { message: 'No user with that username' });
    }

    try {
      if (bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password entered was incorrect' });
      }
    } catch (err) {
      return done(err);
    }
  };

  passport.use(new localStrategy(authenticateUser));
  passport.serializeUser((user, done) => {});
  passport.deserializeUser((id, done) => {});
}

router.post(
  '',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = initialize;
