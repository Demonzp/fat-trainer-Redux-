const { Router } = require('express');
const { workoutGet, workoutPost, workoutPut, workoutDelete } = require('../controllers/workoutController');

const router = Router();

router.get('/workout/', workoutGet);
router.post('/workout/', workoutPost);
router.put('/workout/:workoutID', workoutPut);
router.delete('/workout/:workoutID', workoutDelete);

module.exports = router;