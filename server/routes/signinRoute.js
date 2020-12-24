const { Router } = require('express');
const { signin } = require('../controllers/signinController');

const signinRoute = Router();

signinRoute.post('/signin', signin);

module.exports = signinRoute;