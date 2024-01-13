const { createMilestone, getMilestone } = require("../controllers/milestone");
const {
  createVacation,
  updateVacation,
  getAllVacations,
  getVacation,
} = require("../controllers/vacation");
const upload = require("../util/multer");

const router = require("express").Router();

/*--Vacation--*/
router.post('/create/:id', createVacation)
router.get("/get-all-vacations/", getAllVacations);
router.get("/detail/:id", getVacation);

router.patch("/:id", updateVacation);




/*--MileStone--*/
// router.post("/create/", createVacation);
router.post("/milestone/:id", createMilestone);
router.get("/milestone/:id", getMilestone);

module.exports = router;
