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
require('dotenv').config({ path: path.resolve(__dirname, '/.env') })

const admin_email = process.env.admin_email;
const database_link = process.env.db || "mongo";


var auth = require('./routes/auth')
var user = require('./routes/user')
var api = require('./routes/api')
var code = require('./routes/code')

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
app.use('/code', code);
app.use("/public", express.static('public'));
app.get("/", function (req, res) {
  /*
   * Edit this to change the MOTD
   */
  return res.status(200).send(`Welcome to XSS_BOMB api
  this server is currently online. For any problem please contact <a href="mailto:${admin_email}">
  website administrator</a>. We will work with you to find a solution to your
  inquirery.`);
});

module.exports = app
