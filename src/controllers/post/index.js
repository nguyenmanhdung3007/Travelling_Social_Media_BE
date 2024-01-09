const postModel = require("../../models/post");
const { postSchema } = require("../post/validation");

const createPost = async (req, res) => {
  try {
    const userId = req.params.id;
    const { vacation, content, images, likes, comments } = req.body;

    const validate = postSchema.validate({
      content,
      images,
    });
    if (validate.error) {
      return res.status(400).json({ error: validate.error.message });
    }

    const post = postModel.create({
      content,
      images,
    });

    return res.status(400).json({
      sucess: true,
      message: "Đã tạo bài viết thành công",
      data: post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
const likePost = async (req, res) => {
  const userId = req.params.id;
  const postId = req.body;

  const post = postModel.findById(postId);
  const isLiked = post.likes
};

module.exports = { createPost };
