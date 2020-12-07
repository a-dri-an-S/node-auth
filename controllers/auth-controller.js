const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied.');


    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        res.locals.user = req.user;
        // console.log(res.locals.user);
        next();
    } catch(err) {
        res.status(400).send(`Invalid Token: ${ err }`)
    }
}

module.exports = { verifyToken };