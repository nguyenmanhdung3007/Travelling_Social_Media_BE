const vacationModel = require("../../models/vacation");
const { vacationSchema } = require("../vacation/validation");

const getAllVacation = async (req, res) => {
  try {
  } catch (error) {}
};

const createVacation = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      title,
      desc,
      startedAt,
      endedAt,
      privacy,
      allowedUsers,
      status,
      participants,
    } = req.body;

    const validate = vacationSchema.validate({
      title,
      desc,
      startedAt,
      endedAt,
      privacy,
      status,
    });

    if (validate.error) {
      return res.status(400).json({ error: validate.error.message });
    }

    if (new Date(endedAt) < new Date(startedAt)) {
      return res
        .status(400)
        .json({ message: "Ngày kết thúc không thể trước ngày bắt đầu." });
    }

    const vacation = await vacationModel.create({
      createdBy: userId,
      title,
      startedAt,
      endedAt,
      privacy,
      status,
      participants,
    });

    res.status(200).json({
      sucess: true,
      message: "Đã tạo kỳ nghỉ thành công",
      data: vacation,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi trong quá trình tạo kỳ nghỉ" });
  }
};

const updateVacation = async (req, res) => {
  try {
    // Lấy ID của kỳ nghỉ cần cập nhật từ tham số yêu cầu
    const vacationId = req.params.id;

    // Kiểm tra xem kỳ nghỉ có tồn tại hay không
    const existingVacation = await Vacation.findById(vacationId);
    if (!existingVacation) {
      return res.status(404).json({ message: "Vacation not found" });
    }

    // Kiểm tra xem người đăng nhập có quyền cập nhật kỳ nghỉ không
    // if (req.user._id.toString() !== existingVacation.createdBy.toString()) {
    //   return res
    //     .status(403)
    //     .json({
    //       message: "You do not have permission to update this vacation",
    //     });
    // }

    // Lấy thông tin cập nhật từ req.body
    const {
      title,
      desc,
      startedAt,
      endedAt,
      privacy,
      allowedUsers,
      status,
      participants,
    } = req.body;

    // Cập nhật thông tin của kỳ nghỉ
    existingVacation.title = title || existingVacation.title;
    existingVacation.desc = desc || existingVacation.desc;
    existingVacation.startedAt = startedAt || existingVacation.startedAt;
    existingVacation.endedAt = endedAt || existingVacation.endedAt;
    existingVacation.privacy = privacy || existingVacation.privacy;
    existingVacation.allowedUsers =
      allowedUsers || existingVacation.allowedUsers;
    existingVacation.status = status || existingVacation.status;
    existingVacation.participants =
      participants || existingVacation.participants;

    // Lưu kỳ nghỉ đã được cập nhật vào cơ sở dữ liệu
    const updatedVacation = await existingVacation.save();

    // Trả về thông tin của kỳ nghỉ đã cập nhật
    res.status(200).json(updatedVacation);
  } catch (error) {
    console.error("Error updating vacation:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteVacation = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = { createVacation, updateVacation, deleteVacation };
