const views = require('express').Router();

// ABOUT
const about = require('./../controllers/about.js');
views.route(['/', '/about'])
  .get(about.onGet);
  
// SIGN-ON
const signon = require('./../controllers/signon.js');
views.route('/signon')
  .get(signon.onGet)
  .post(signon.onPost);

// SIGN-UP
const signup = require('./../controllers/signup.js');
views.route('/signup')
  .get(signup.onGet)
  .post(signup.onPost);

// HOME
const home = require('./../controllers/home.js');
const authenticate = require('./../middleware/authenticate.js');

views.use(authenticate);
views.route('/home')
  .get( home.onGet)
  .post(home.onPost);

// SIGN-OUT
const signoff = require('./../controllers/signoff.js');
views.route('/signout')
  .get(signoff.onGet);

module.exports = views;