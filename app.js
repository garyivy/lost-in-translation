const express = require('express');
var app = express();

// https://www.quora.com/What-exactly-does-body-parser-do-with-express-js-and-why-do-I-need-it
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set up a cookie based session (so that we can use req.session.isAuthorized to enforce sign-on).
const session = require('express-session');
const sessionConfig = require('./config/session.config.js');
app.use(session(sessionConfig));

// Configure express for .pug file compiling
app.set('view engine', 'pug');
app.set('views', 'views');

// Designate where static files can be found
app.use('/static', express.static('static'))

// Install router for REST API
const authenticateApi = require('./middleware/authenticateApi.js');
app.use('/api/v1', authenticateApi, require('./routes/api.v1.js'));
app.use('/api/v2', authenticateApi, require('./routes/api.v2.js'));

// Install router for Web Pages
app.use('/', require('./routes/views.js'));

// Install default error handling
// http://expressjs.com/en/guide/error-handling.html
app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).send('An error occurred while processing your request');
});

// Assume no routes matched
app.use((request, response) => {
  response.status('404').send('No match for ' + request.url);
});

// Start Web Server
app.listen(3001, () => {
  console.log('Express server listening on port 3001.')
});

// Connect To Mongo
const mongoose = require('mongoose');
const dbName = 'lit'; // L[ost]I[n]T[ranslation]
var mongooseOptions = {
    server: {
        socketOptions: {
            socketTimeoutMS: 30000,
            connectTimeoutMS: 30000
        }
    }
};
const connectionString = 'mongodb://localhost:27017/' + dbName;
var connectWithRetry = function () {
    return mongoose.connect(connectionString, mongooseOptions, function (error) {
        if (error) {
            console.error('Failed to connect to mongo on startup - retrying in 5 sec', error);
            setTimeout(connectWithRetry, 5000);
        }
    });
};
connectWithRetry();
