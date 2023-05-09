/* const { authenticate } = require('passport');
const bcrypt = require('bcrypt');

const localStrategy = require('passport-local').Strategy;

function initialize(passport, getUserByUsername) {
  const authenticateUser = (username, password, done) => {
    //creating user const and checking username to confirm if their is a user with this name
    const user = getUserByUsername(Username);

    //if no user with this username, returning message that there is no user with that username
    if (user === null) {
      return done(null, false, { message: 'No user with that username' });
    }

    try {
      //bcrypt will compare hashed,stored password to confirm if valid
      if (bcrypt.compare(password)) {
        return done(null, user);
      } else {
        //if not valid returning message that password is incorrect
        return done(null, false, { message: 'Password entered was incorrect' });
      }
    } catch (err) {
      return done(err);
    }
  };
  passport.use(new localStrategy(), authenticateUser);
  passport.serializeUser((user, done) => {});
  passport.deserializeUser((id, done) => {});
}

router.post(
  '',
  passport.authentication('local', {
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

module.export = initialize;

const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.login(userData, (err) => {
      if (err) {
        res.status(400).json(err);
      } else {
        req.session.save(() => {
          res.status(200).json(userData);
        });
      }
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// SET UP LOCAL STRATEGY FOR PASSPORT.JS
passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const userData = await User.findOne({ where: { email } });

      if (!userData) {
        return done(null, false, {
          message: 'Incorrect email or password, please try again',
        });
      }

      const validPassword = await bcrypt.compare(password, userData.password);

      if (!validPassword) {
        return done(null, false, {
          message: 'Incorrect email or password, please try again',
        });
      }

      return done(null, userData);
    } catch (err) {
      return done(err);
    }
  })
);

// LOG IN existing user (FIND USER BY EMAIL AND CHECK PASSWORD)
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

// SERIALIZE USER ID FOR SESSION STORAGE
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// DESERIALIZE USER BY ID FOR SESSION RETRIEVAL
passport.deserializeUser(async (id, done) => {
  try {
    const userData = await User.findByPk(id);

    if (!userData) {
      return done(null, false, {
        message: 'User not found',
      });
    }

    return done(null, userData);
  } catch (err) {
    return done(err);
  }
});

// LOG OUT user and end session
router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy(() => {
    res.status(204).end();
  });
});

module.exports = router; */
const express = require('express')
const app = express()

const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

app.use(express.urlencoded({extended: false}))

authUser = (user, password, done) => {
  let authenticated_user = {id: , name: ""}
  return done (null, authenticated_user)
}

passport.serializeUser((userObj, done) => {
  done(null, userObj)
})

passport.deserializeUser((userObj, done) => {
  done(null, userObj)
})

app.post ('/login', passport.authenticate('local', {
  successRedirect: '/mygarden',
  failureRedirect: '/login',
}))

