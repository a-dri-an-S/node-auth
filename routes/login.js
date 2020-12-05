const router = require('express').Router();

const { login, issueToken } = require('../controllers/login-controller');

router.post('/', login, issueToken);

module.exports = router;