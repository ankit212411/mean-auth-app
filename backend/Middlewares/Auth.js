const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => { 
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(auth, process.env.VERCEL_JWT_SCERET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized, JWT Token' });
    }
}

module.exports = {
    ensureAuthenticated,
}