const { Router } = require('express');
const { userGet, userDelete } = require('../controllers/userController');

const router = Router();

router.get('/user/', userGet);
// router.delete('/user/', userDelete);

module.exports = router;