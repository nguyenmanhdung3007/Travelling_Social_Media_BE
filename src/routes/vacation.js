const { createMileStone } = require("../controllers/milestone");
const {
  createVacation,
  updateVacation,
  getAllVacations,
} = require("../controllers/vacation");

const router = require("express").Router();

// router.post('/create/:id', createVacation)
router.get("/get-all-vacations/", getAllVacations);

router.post("/create/", createVacation);
router.post("/milestone/:id", createMileStone);

router.patch("/:id", updateVacation);

module.exports = router;
