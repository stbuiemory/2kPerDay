const { authenticate } = require('passport');
const bcrypt = require('bcrypt');

const localStrategy = require('passport-local').Strategy;

function initialize(passport, getUserByUsername) {
  const authenticateUser = (username, password, done) => {
    //creating user const and checking username to confirm if their is a user with this name
    const user = getUserByUsername(Username);

    //if no user with this username, returning message that there is no user with that username
    if (user == null) {
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

module.export = initialize;
