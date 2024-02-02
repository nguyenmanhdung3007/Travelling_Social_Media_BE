const {
  createAlbum,
  deleteAlbum,
  getAllAlbums,
} = require("../controllers/album");
const { login } = require("../controllers/users/userController");

const router = require("express").Router();

router.post("/create-album", login, createAlbum);
router.get("/get-all", login, getAllAlbums);
router.delete("/detail/:id", login, deleteAlbum);

module.exports = router;
