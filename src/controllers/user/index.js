const { User } = require("../../models/user");

const getAllUser = async (req, res) => {
    try {
        const users = await User.find({})
        return res.status(200).json({
          user: users,
        });
      } catch (error) {
        return res.status(400).json({message: error.message});
      }
}

module.exports = {getAllUser}