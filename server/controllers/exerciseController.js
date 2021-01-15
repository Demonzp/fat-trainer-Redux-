const { Exercise } = require('../models/Exercise');
const { User } = require('../models/User');

// // ONLY FOR TESTING!
// // GET exercises list of specific user (by user ID).
// const exerciseGet = async (req, res) => {
//     try {
//         const exercises = await Exercise.find({ owner: req.user._id });
//         res.json(exercises);
//     } catch (err) {
//         console.error(err);
//         res.json({ message: err.message });
//     }
// };

// // ONLY FOR TESTING!
// // GET specific exercise (by exercise ID), which belongs to specific user.
// const exerciseExactGet = async (req, res) => {
//     try {
//         const { exerciseID } = req.params;
//         const exercise = await Exercise.findOne({ _id: exerciseID });
//         res.json(exercise);
//     } catch (err) {
//         console.error(err);
//         res.json({ message: err.message });
//     }
// };

// CREATE new exercise in a list of specific user (by user ID).
const exercisePost = async (req, res) => {
    try {
        const { name, measureType } = req.body;
        const exercise = await Exercise.create({ name, measureType, owner: req.user._id });
        res.status(201).json({ message: 'Exercise created successfully!', exercise });

        const user = await User.findOne({ _id: req.user._id });
        user.exercises.push(exercise._id);
        await user.save();
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

        const user = await User.findOne({ _id: req.user._id });
        user.exercises.pull({ _id: exerciseID });
        await user.save();
    } catch (err) {
        console.error(err);
        res.json({ message: err.message });
    }
};

module.exports = {
    // exerciseGet,
    // exerciseExactGet,
    exercisePost,
    exercisePut,
    exerciseDelete,
};