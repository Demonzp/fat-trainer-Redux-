const { Router } = require('express');
const { authMdw } = require('../middleware/authMiddleware');
const { userGet, userDelete } = require('../controllers/userController');

const router = Router();

router.get('/users', authMdw, userGet);
router.delete('/users', authMdw, userDelete);

module.exports = router;