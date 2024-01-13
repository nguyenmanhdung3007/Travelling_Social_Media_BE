const { log } = require("console");
const { uploadImage } = require("../../cloudinary");
const postModel = require("../../models/post");
const { postSchema } = require("../post/validation");
const milestoneModel = require("../../models/milestone");

const getPost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await postModel
      .findById(postId)
      .populate("milestone")
      .populate({ path: "postBy", select: "-password" })
      .populate({ path: "comments", select: "-password" });

    return res.status(200).json({
      sucess: true,
      data: post,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Đã xảy ra lỗi trong quá trình load bài post" });
  }
};

const createPost = async (req, res) => {
  try {
    const userId = req.params.id;
    const { milestone, content, likes, comments } = req.body;
    const images = req.file;

    console.log(images);
    const data = await uploadImage(images);
    console.log(data);

    const validate = postSchema.validate({
      content,
    });
    if (validate.error) {
      return res.status(400).json({ error: validate.error.message });
    }

    const post = await postModel.create({
      postBy: userId,
      milestone,
      content,
      likes,
      comments,
      images: data,
    });

    const milestoneObj = await milestoneModel.findById(milestone);

    milestoneObj.posts.push(post);
    milestoneObj.save();

    return res.status(200).json({
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
  const isLiked = post.likes;
};

module.exports = { createPost, getPost };
