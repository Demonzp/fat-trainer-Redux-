const { Router } = require('express');
const { userGet, userDelete } = require('../controllers/userController');

const router = Router();

router.get('/users/', userGet);
router.delete('/users/', userDelete);

module.exports = router;