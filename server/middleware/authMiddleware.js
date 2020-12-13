// 'Custom JWT' authentication.
const jwt = require('jsonwebtoken');

module.exports.authMdw = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        res.status(401).json({ message: 'Token not provided!' });
        return;
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
            req.user = { userID: user };
            if (err) {
                console.error(err);
            }
        });
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            console.error(err);
            res.status(401).json({ message: 'Invalid Token!' });
            return;
        } else {
            throw err;
        }
    };
    next();
};