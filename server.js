const express = require('express');
const session = require('express-session');
const path = require('path');
// const Sequelize = require('sequelize');
// const MySQLStore = require('connect-session-sequelize')(session.Store);
// const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//const Handlebars = require('express-handlebars');
// const { v4: uuidv4 } = require('uuid');
// const { User } = require('./models');
/* FYI: The above lines from Sandy's original are commented out
        because those consts are "assigned a value but never used"
        as pointed out by ESlint */

// LILLIAN NOTE TODO: lines 16-28 below are from a class example, recommended usage by tutor
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/time-helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({});

app.use(express.urlencoded({ extended: false }));

//sets up session, need to set up cookies
const sess = {
  secret: 'Secret session key',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(authUser));

// Handlebars start
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// app.use("/img", express.static(path.join(__dirname, "public/img")));

app.get('/', (req, res) => {
  res.render('partials/login', { layout: 'main' });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
