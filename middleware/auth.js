const jwt = require('jsonwebtoken');
const config = require('config');

//Middleware function
module.exports = (req, res, next) => { //For every middleware function, next needs to be called.
    //Get token from the header
    const token = req.header('x-auth-token'); //We are grabbing the x-auth-token from the header
    if (!token) {
        return res.status(401).json({ msg: 'No token. Authorization denied.' })
    }
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret')) //Once verified, the obj will be storeed in decoded.

        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}