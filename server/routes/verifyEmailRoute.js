const { Router } = require('express');
const { verifyEmail } = require('../controllers/verifyEmailController');

const router = Router();

router.post('/verification', verifyEmail);

module.exports = router;