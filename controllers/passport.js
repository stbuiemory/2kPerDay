const { authenticate } = require('passport')
const bcrypt = require('bcrypt')

const localStrategy = require('passport-local').Strategy

function initialize (passport, getUserbyUsername) {
    const authenticateUser = (username, password, done) => {
        const user = getUserByUsername(Username)
        if (user == null) {
            return done (null, false, { message: 'No user with that username'})
        }

        try {
            if ( bcrypt.compare(password)) {
                return done(null, user)
            } else {
                return done(null, false, {message: 'Password entered was incorrect'})
            }
        } catch (err) {
            return done(err)
        }
    }
    passport.use(new localStrategy, authenticateUser)
    passport.serializeUser((user, done) => { })
    passport.deserializeUser((id, done) => { })
}

module.export = initialize