const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5500;

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
//Makes the express app use the route content.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(routes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log('Running on port ' + PORT);
  });
});
