const jwt = require('jsonwebtoken');

module.exports.authMdw = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        res.status(401).json({ message: 'Token not provided!' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
            if (err) {
                throw err;
            }
            req.user = { userID: user.sub };
        });
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            console.error(err);
            res.status(401).json({ message: 'Invalid Token!' });
            return;
        }
    };
    next();
};