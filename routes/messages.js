const router = require('express').Router();
const { verifyToken } = require('../controllers/auth-controller');
const { seedDB, getMessagesBySender } = require("../controllers/messages-controller");

// router.get('/', verifyToken, (req, res) => res.json({ 
//     message: { 
//         receiver: "5fcbc8c923093e4c2470ce72",
//         sender: "5fcbc92b23093e4c2470ce73",
//         message: "lo"    
//     } 
// }))

// GET //
router.get("/", verifyToken, getMessagesBySender);

// POST //


// PUT //


// SEED //
router.post('/seedDB', seedDB);

module.exports = router;

