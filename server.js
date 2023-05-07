const express = require('express');
const session = require('express-session');
// const Sequelize = require('sequelize');
// const MySQLStore = require('connect-session-sequelize')(session.Store);
// const bcrypt = require('bcrypt');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const Handlebars = require('express-handlebars');
// const { v4: uuidv4 } = require('uuid');
// const { User } = require('./models'); // Assuming we defined our user model in models/index.js.  Rename based on Lilian's model feature

// const app = express();
// const PORT = process.env.PORT || 3001;

// LILLIAN NOTE TODO: lines 16-28 from class example, recommended by tutor
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/time-helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

//sets up session, need to set up cookies
const sess = {
  secret: 'Secret session key',
  cookie: {},
  resave: false,
  saveUnitilized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
