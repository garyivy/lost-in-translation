const api = require('express').Router();
const ideas = require('./../controllers/ideas.js');
const authenticateApi = require('./../middleware/authenticateApi.js');

api.use(authenticateApi);

api.route('/idea')
    .get(ideas.onGet);

api.route('/ideas')
    .get(ideas.onGetAll);

module.exports = api; 