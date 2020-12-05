const { users } = require('../data/data');
const User  = require('../models/User');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const getUsers = (req, res) => {
    User.find()
        .exec((err, docs) => {
            if (err) res.status(500).json({ message: `There was an error with the database: ${ err }.` });
            else if( docs.length === 0 ) res.status(404).json({ message: 'There were no users found.' });
            else res.status(200).json(docs);
        })
}

const createUser = async (req, res) => {

    let salt = await bcrypt.genSalt(10);
    let pass = await bcrypt.hash(req.body.password, salt);

    const newUser = {
        name: req.body.name,
        password: pass,
        email: req.body.email
    };

    User.create(newUser, (err, user) => {
        if (err) res.status(500).send({ message: err });
        else res.status(201).send(user);
    });
}

const seedDB = async (req, res) => {
    let encryptedUsers = [];
    for (let i = 0; i < users.length; i++) {
        let salt = await bcrypt.genSalt(10);
        let pass = await bcrypt.hash(users[i].password, salt);
        encryptedUsers.push({ ...users[i], password: pass, email: users[i].email.toLowerCase() });
    }
    User.insertMany(encryptedUsers)
        .then(res.status(201).send({ encryptedUsers }))
        .catch(err => res.status(500).send({ message: err }));
}

module.exports = { getUsers, seedDB, createUser };