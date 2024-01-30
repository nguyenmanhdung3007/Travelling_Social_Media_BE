const commentModel = require("../../models/comment");
const postModel = require("../../models/post");
const { User } = require("../../models/user");

const createComment = async (req, res) => {
  try {
    // const id = req.body;
    const postId = req.params.id;
    const { comment } = req.body;
    const userId = req.user;
    console.log(userId)

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(400).json({ message: "Bài post không tồn tại" });
    }

    if (comment === null) {
      return res.status(404).json({ message: "Hãy viết comment của bạn" });
    }

    const user = await User.findById(userId);
    console.log(user);
    const from = user.userName;

    const newComment = await commentModel.create({
      comment,
      from,
      userId: userId,
      postId: postId,
    });

    //updating the post with the comments id
    await post.comments.push(newComment._id);

    await post.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
const getComment = async (req, res) => {
  try {
    const commentId = req.params.id;

    const comment = await commentModel
      .findById(commentId)
      .populate("post")
      .populate({ path: "userId", select: "-password" })

    return res.status(200).json({
      sucess: true,
      data: post,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Đã xảy ra lỗi trong quá trình load bài post" });
  }
};
const getAllComment = async (req, res) => {};
const updateComment = async (req, res) => {};
const deleteComment = async (req, res) => {};

module.exports = {
  createComment,
  getComment,
  getAllComment,
  updateComment,
  deleteComment,
};
