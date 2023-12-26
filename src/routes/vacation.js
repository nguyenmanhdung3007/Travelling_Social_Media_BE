const { createVacation } = require("../controllers/vacation");
    
const router = require("express").Router();

router.post('/post/:id', createVacation)

module.exports = router;