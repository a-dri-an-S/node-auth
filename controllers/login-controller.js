const User  = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    console.log(req.body.password);

    let name = req.body.email.toLowerCase();
    let pass = req.body.password;
    let match = false;
    await User.findOne({ email: name })
        .then(user => {
            match = bcrypt.compareSync(pass, user.password);
            if (match) {
                req.user = user;
                return next();
            } else {
                res.status(401).send({ message: "ACCESS DENIED" })
            }
        });
}

const issueToken = (req, res) => {
    const token = jwt.sign({_id: req.user.id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
}

module.exports = { login, issueToken };