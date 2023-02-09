const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 5500;

//Makes the express app use the route content.
app.use(express.static('public'));
app.use(routes);



app.listen(PORT, () => {
    console.log('Running on port '+PORT);
});

