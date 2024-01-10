const { createPost } = require("../controllers/post");
const upload = require('../util/multer')

const router = require("express").Router();

router.post("/create-post/:id", upload.single("images"), createPost);

module.exports = router;
