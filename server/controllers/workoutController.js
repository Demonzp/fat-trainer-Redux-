const { User } = require('../models/User');
const { Workout } = require('../models/Workout');

// // ONLY FOR TESTING!
// // GET workout list (by user ID).
// const workoutGet = async (req, res) => {
//     try {
//         const workouts = await Workout.find({ owner: req.user._id });
//         res.json(workouts);
//     } catch (err) {
//         console.error(err);
//         res.json({ message: err.message });
//     }
// };

// CREATE new workouts in user's list (by user ID).
const workoutPost = async (req, res) => {
    try {
        const { date, exercises } = req.body;
        const workout = await Workout.create({ date, exercises, owner: req.user._id });
        res.status(201).json({ message: 'Workout created successfully!', workout });

        const user = await User.findOne({ _id: req.user._id });
        user.workouts.push(workout._id);
        await user.save();
    } catch (err) {
        console.error(err);
        res.json({ message: err.message });
    }
};

// UPDATE already existed workout in a list of specific user.
const workoutPut = async (req, res) => {
    try {
        const { workoutID } = req.params;
        const workout = await Workout.findOneAndUpdate({ _id: workoutID }, req.body, { new: true });
        res.json(workout);
    } catch (err) {
        console.error(err);
        res.json({ message: err.message });
    }
};

// DELETE specific workout (by workout ID) from list of specific user.
const workoutDelete = async (req, res) => {
    try {
        const { workoutID } = req.params;
        const workout = await Workout.deleteOne({ _id: workoutID })
        res.json(workout);
    } catch (err) {
        console.error(err);
        res.json({ message: err.message });
    }
};

module.exports = {
    // workoutGet,
    workoutPost,
    workoutPut,
    workoutDelete,
};