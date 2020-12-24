const { Router } = require('express');
const { verifyEmail } = require('../controllers/verifyEmailController');

const verifyEmailRoute = Router();

verifyEmailRoute.post('/verification', verifyEmail);

module.exports = verifyEmailRoute;