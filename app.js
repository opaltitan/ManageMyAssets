process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Require all necessary modules
var config = require('./config/config'),
    mongoose = require('./config/mongoose'),
    express = require('express'),
    http = require('http'),
    socketio = require('socket.io'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
    apassport = require('passport'),
    uPassport = require('./config/passport');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

// References the MongoDB database (see config/mongoose.js)
var db = mongoose();

// Initial setup of the Node Server
var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);

// Determines if files should be compressed (if in Production)
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
  app.use(compress());
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());

// MongoStore is used for authentication.
// Specifies the current db
var mongoStore = new MongoStore({
    db: db.connection.db
});

// Registers the session secret (for authentication)
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: config.sessionSecret,
  store: mongoStore
}));

// Specifies directory of the initial views (mainly just index.ejs, but also signin.ejs, signup.ejs, and error.ejs)
app.set('views', path.join(__dirname, 'views'));
// Specifies that EJS templating should be used.
app.set('view engine', 'ejs');

// Injects new session
app.use(flash());
app.use(apassport.initialize());
app.use(apassport.session());

// Registers all possible routes
require('./routes/index.server.routes.js')(app);
require('./routes/users.server.routes.js')(app);
require('./routes/asset.server.routes.js')(app);
require('./routes/activity.server.routes.js')(app);

// Specifies location of browser-side files
app.use(express.static('./public'));
// Connects the Socket.IO events in config/socketio.js with the server and mongoStore
require('./config/socketio')(server, io, mongoStore);
// Specifies that the CSS precompiler Stylus will be used
app.use(require('stylus').middleware(path.join(__dirname, 'public')));

// Injects passport authentication
var passport = uPassport();

// Server listening on port 3001
server.listen(3001);

console.log('Server running at http://localhost:3001/');

// Exports the Node application
module.exports = app;