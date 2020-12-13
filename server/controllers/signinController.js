const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// AUTHORIZATION of registered user in the application.
const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (!user) {
        res.status(401).json({ message: 'Such user doesn\'t exist! Please registrate yourself!' });
    }
    
    try {
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            res.status(401).json({ message: 'Invalid credentials!' });
        } else if (!user.active) {
            return res.status(400).json({ message: 'Please verificate yourself from your registration mailbox!' });
        } else {
            const token = jwt.sign(user._id.toString(), process.env.ACCESS_SECRET_KEY);
            res.json({ token });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = { signin };