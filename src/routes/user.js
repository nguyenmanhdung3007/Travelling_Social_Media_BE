const router = require("express").Router();
const userController = require("../controller/userController");
router.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

// dang ki , dang nhap, quen mat khau, thay doi mat khau
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/forgetpass", userController.forgetPass);
router.post("/changepass/:id", userController.userChangePass);
// --- end user ----

module.exports = router;
