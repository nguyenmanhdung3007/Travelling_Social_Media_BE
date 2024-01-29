const { createMilestone, getMilestone } = require("../controllers/milestone");
const { login } = require("../controllers/users/userController");
const {
  createVacation,
  updateVacation,
  getAllVacations,
  getVacation,
  getVacationOnPageUser,
  finishVacation,
  getVacationInProgessOfUser,
  deleteVacation,
} = require("../controllers/vacation");
const verifyToken = require("../middlewares/authentication");
const upload = require("../util/multer");

const router = require("express").Router();

/*--Vacation--*/
router.post("/create",login, createVacation);
router.get("/get-all-vacations/",login, getAllVacations);
router.get("/detail/:id", getVacation);
router.get("/:id", login,getVacationOnPageUser);
router.get("/in-progess/:id",login, getVacationInProgessOfUser);

router.patch("/:id",login, updateVacation);
router.patch("/finish/:id",login, finishVacation);


router.delete("/delete/:id",login, deleteVacation);

/*--MileStone--*/
// router.post("/create/", createVacation);
router.post("/milestone/:id", createMilestone);
router.get("/milestone/:id", getMilestone);

module.exports = router;
