const User = require('../models/User');

// // TEST
// const userGet =  async (req, res) => {
//     try {
//         const user = await User.find();
//         res.json(user);
//     } catch (err) {
//         console.error(err);
//         res.json({ message: err.message });
//     }
// };

// GET profile of specific user (by user ID).
const userGet =  async (req, res) => {
    try {
        const { userID } = req.user;
        const user = await User.findOne({ _id: userID });
        if (!user) {
            throw new Error('Problem with authorization.');
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.json({ message: err.message });
    }
};

// DELETE existed user's profile (by user ID).
const userDelete = async (req, res) => {
    try {
        const { userID } = req.user;
        const user = await User.deleteOne({ _id: userID })
        res.json(user);
    } catch {
        console.error(err);
        res.json({ message: err.message });
    }
};

module.exports = {
    userGet,
    userDelete,
};