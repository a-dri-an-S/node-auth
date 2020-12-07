const router = require('express').Router();
const { verifyToken } = require('../controllers/auth-controller');
const { seedDB, getMessagesBySender, getUserThreads } = require("../controllers/messages-controller");

// router.get('/', verifyToken, (req, res) => {
//     res.json({ 
//     message: { 
//         receiver: "5fcd54c4b983b506491ea863",
//         sender: "5fcd54c4b983b506491ea862",
//         message: "lo"
//     } 
// })})

router.get("/", verifyToken, getUserThreads);

// GET //
// router.get("/", getMessagesBySender);
// router.get("/"); // This will return a list of users that the logged in user has ever communicated with

// POST //


// PUT //


// SEED //
router.post('/seedDB', seedDB);

module.exports = router;

