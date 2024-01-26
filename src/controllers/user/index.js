const { uploadImage } = require("../../cloudinary");
const { User } = require("../../models/user");
const { userSchema } = require("./validation");

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    return res.status(200).json({
      user: users,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("-password");
    return res.status(200).json({
      sucess: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { fullName, userName, dateOfBirth, gender, bio } = req.body;
    const data = req.files;

    const validate = userSchema.validate({
      fullName,
      bio,
      dateOfBirth,
      gender,
    });
    if (validate.error) {
      return res.status(400).json({ error: validate.error.message });
    }

    const currentDate = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      console.log(this);
      this.age = age - 1;
    } else {
      this.age = age;
    }

    let avatar;
    let cover;
    console.log(data);
    if (data?.avatar) {
      if (data.avatar[0].mimetype.startsWith("image/")) {
        avatar = await uploadImage(data?.avatar);
      } else {
        return res.status(400).json({ error: "Loại tệp không được hỗ trợ" });
      }
    } else {
      avatar = null;
    }
    if (data?.cover) {
      if (data.cover[0].mimetype.startsWith("image/")) {
        cover = await uploadImage(data?.cover);
      } else {
        return res.status(400).json({ error: "Loại tệp không được hỗ trợ" });
      }
    } else {
      cover = null;
    }

    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { fullName, userName, dateOfBirth, gender, avatar, cover, age: this.age },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      message: "Update người dùng thành công",
      user: user,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);

    return res.status(200).json({
      message: "Delete người dùng thành công",
      user: user,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = { getAllUser, getUser, updateUser, deleteUser };
