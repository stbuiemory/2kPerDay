const express = require('express');
const session = require('express-session');
const Sequelize = require('sequelize');
const MySQLStore = require('connect-session-sequelize')(session.Store);
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Handlebars = require('express-handlebars');
const { User } = require('./models'); // Assuming we defined our user model in models/index.js.  Rename based on Lilian's model feature

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});