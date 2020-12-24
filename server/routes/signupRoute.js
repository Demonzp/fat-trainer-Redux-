const { Router } = require('express');
const { signup } = require('../controllers/signupController');

const signupRoute = Router();

signupRoute.post('/signup', signup);

module.exports = signupRoute;