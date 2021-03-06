const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

const app = express();
const path = require('path')
const database_link = process.env.db || "mongo";
require('dotenv').config({ path: path.resolve(__dirname, '/.env') })


var auth = require('./routes/auth')
var user = require('./routes/user')
var api = require('./routes/api')

mongoose.connect("mongodb://" +
  database_link + "/xss_bomb?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
}).then(() => console.log('connection successful'))
.catch(err => console.error(err))

app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(
  bodyParser.json({
    limit: '50mb',
    type: 'application/json'
  })
);
app.use(
  session({
    secret: 's3cr3t',
    resave: true,
    saveUninitialized: true
  })
);
app.use('/auth', auth);
app.use('/user', user);
app.use('/api', api);
app.use("/public", express.static('public'));

module.exports = app
