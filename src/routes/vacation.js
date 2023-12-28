const { createMileStone } = require("../controllers/milestone");
const { createVacation } = require("../controllers/vacation");
    
const router = require("express").Router();

router.post('/:id', createVacation)

router.post('/milestone/:id', createMileStone)

module.exports = router;