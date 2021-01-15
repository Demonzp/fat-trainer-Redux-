const { User } = require('../models/User');

// GET full profile of specific user (by user ID).
const userGet = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id })
            .populate({ path: 'exercises', model: 'Exercise' })
            .populate({ path: 'workouts', model: 'Workout' });
        if (!user) {
            throw new Error('User not found.');
        }
        res.json({
            _id: user._id,
            email: user.email,
            active: user.active,
            exercises: user.exercises,
            workouts: user.workouts,
        });
    } catch (err) {
        console.error(err);
        res.json({ message: err.message });
    }
};

// // ONLY FOR TESTING!
// // DELETE existed user's profile (by user ID).
// const userDelete = async (req, res) => {
//     try {
//         const user = await User.deleteOne({ _id: req.user._id });
//         res.json(user);
//     } catch {
//         console.error(err);
//         res.json({ message: err.message });
//     }
// };

module.exports = {
    userGet,
    // userDelete,
};