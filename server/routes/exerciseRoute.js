const { Router } = require('express');
const { exerciseGet, exerciseExactGet, exercisePost, exercisePut, exerciseDelete } = require('../controllers/exerciseController');

const router = Router();

router.get('/exercise/', exerciseGet);
router.get('/exercise/:exerciseID', exerciseExactGet);
router.post('/exercise/', exercisePost);
router.put('/exercise/:exerciseID', exercisePut);
router.delete('/exercise/:exerciseID', exerciseDelete);

module.exports = router;