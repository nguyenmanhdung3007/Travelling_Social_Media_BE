const { createComment } = require("../controllers/comment");
const { createPost, getPost, likePost } = require("../controllers/post");
const { login } = require("../controllers/users/userController");
const upload = require('../util/multer')

const router = require("express").Router();

router.post("/create-post",login, upload.single("images"), createPost);

router.get("/detail/:id", getPost);


/*--react--*/
router.patch("/:id/like",login, likePost);

/*--comment--*/
router.post("/detail/:id",login, createComment);

module.exports = router;
