const { Router } = require('express');
const { authMdw } = require('../middleware/authMiddleware');
const { exerciseGet, exerciseExactGet, exercisePost, exercisePut, exerciseDelete } = require('../controllers/exerciseController');

const router = Router();

router.get('/exercise/', authMdw, exerciseGet);
router.get('/exercise/:exerciseID', authMdw, exerciseExactGet);
router.post('/exercise/', authMdw, exercisePost);
router.put('/exercise/:exerciseID', authMdw, exercisePut);
router.delete('/exercise/:exerciseID', authMdw, exerciseDelete);

module.exports = router;