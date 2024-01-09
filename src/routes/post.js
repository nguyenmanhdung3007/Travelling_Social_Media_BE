const { createPost } = require("../controllers/post");

const router = require("express").Router();

router.post("/create-post", createPost)

module.exports = router;