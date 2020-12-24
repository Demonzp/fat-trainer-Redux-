const bcrypt = require('bcryptjs');
const User = require('../models/User');

// REGISTER new user in DB.
const signup = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const verificationCode = Math.floor((Math.random() * 10000));

        const user = await User.create({
            email: req.body.email,
            password: hashedPassword,
            verificationCode,
        });

        if (user) {
            console.log(user);
            res.status(201).json({ message: 'Registration completed successfully!', code: verificationCode });
        }
    } catch (err) {
        console.error(err);
        res.status(409).json('User with this email already exists.');
    }
};

module.exports = { signup };