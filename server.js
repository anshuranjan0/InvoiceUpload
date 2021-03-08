const express = require('express')
const app = express();

const path = require('path');
const hbs = require('express-handlebars')
app.use(express.json());


//serving static files
app.use(express.static(path.join(__dirname, 'public')));

//connect mongodb
require('./database/database')();

//setup view engine
app.set('view engine', 'hbs')
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views/partials')

}))

//call routes
app.use('/', require('./server/router/router'))

app.listen(3000, ()=> console.log("Server is started on http://localhost:3000"))