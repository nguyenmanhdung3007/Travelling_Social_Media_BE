const { createComment } = require("../controllers/comment");
const { createPost, getPost, likePost } = require("../controllers/post");
const upload = require('../util/multer')

const router = require("express").Router();

router.post("/create-post/:id", upload.single("images"), createPost);
router.post("/detail/:id", createComment);

router.get("/detail/:id", getPost);


/*--react--*/
router.patch("/:id/like", likePost);

module.exports = router;
