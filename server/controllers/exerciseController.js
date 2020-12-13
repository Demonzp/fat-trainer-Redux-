const Exercise = require('../models/Exercise');

// GET exercises list of specific user (by user ID).
const exerciseGet = async (req, res) => {
    try {
        const { userID } = req.user;
        const exercises = await Exercise.find({ userID });
        res.json(exercises);
    } catch (err) {
        console.error(err);
        res.json({ message: err.message });
    }
};

// GET specific exercise (by exercise ID), which belongs to specific user.
const exerciseExactGet = async (req, res) => {
    try {
        const { exerciseID } = req.params;
        const exercise = await Exercise.find({ _id: exerciseID });
        res.json(exercise);
    } catch (err) {
        console.error(err);
        res.json({ message: err.message });
    }
};

// CREATE new exercises in a list of specific user.
const exercisePost = async (req, res) => {
    try {
        const { userID } = req.user;
        const { name, measureType } = req.body;
        const exercise = await Exercise.create({ name, measureType, userID });
        res.status(201).json({ message: 'Exercise created successfully!', exercise });
    } catch (err) {
        console.error(err);
        res.json({ message: err.message });
    }
};

// UPDATE already existed exercise (by exercise ID) in a list of specific user.
const exercisePut = async (req, res) => {
    try {
        const { exerciseID } = req.params;
        const exercise = await Exercise.findOneAndUpdate({ _id: exerciseID }, req.body, { new: true });
        res.json(exercise);
    } catch (err) {
        console.error(err);
        res.json({ message: err.message });
    }
};

// DELETE specific exercise from list of specific user.
const exerciseDelete = async (req, res) => {
    try {
        const { exerciseID } = req.params;
        const exercise = await Exercise.deleteOne({ _id: exerciseID })
        res.json(exercise);
    } catch (err) {
        console.error(err);
        res.json({ message: err.message });
    }
};

module.exports = {
    exerciseGet,
    exerciseExactGet,
    exercisePost,
    exercisePut,
    exerciseDelete,
};