const api = require('express').Router();
const ideas = require('./../controllers/ideas.js');
const authenticateApi = require('./../middleware/authenticateApi.js');

api.route('/idea')
    .get(ideas.onGet);

module.exports = api; 