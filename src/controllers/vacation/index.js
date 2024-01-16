const vacationModel = require("../../models/vacation");
const milestoneModel = require("../../models/milestone");
const { vacationSchema } = require("../vacation/validation");
const { createMilestone } = require("../milestone");

const getVacation = async (req, res) => {
  try {
    const vacationId = req.params.id;

    const vacation = await vacationModel
      .findById(vacationId)
      .populate("comments")
      .populate("milestones")
      .populate({ path: "allowedUsers", select: "-password" })
      .populate({ path: "participants", select: "-password" });

    return res.status(200).json({
      sucess: true,
      data: vacation,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Đã xảy ra lỗi trong quá trình load kỳ nghỉ" });
  }
};

const getAllVacations = async (req, res) => {
  try {
    const vacations = await vacationModel.find({}).populate;

    return res.status(200).json({ sucess: true, data: vacations });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi trong quá trình load kỳ nghỉ" });
  }
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
      userChoose,
      // status,
      participants,
      milestones,
    } = req.body;

    const validate = vacationSchema.validate({
      title,
      desc,
      startedAt,
      endedAt,
      // privacy,
      // status,
    });

    if (validate.error) {
      return res.status(400).json({ error: validate.error.message });
    }

    if (new Date(endedAt) < new Date(startedAt)) {
      return res
        .status(400)
        .json({ message: "Ngày kết thúc không thể trước ngày bắt đầu." });
    }

    if (privacy === "onlyUserChoose") {
      vacation = await vacationModel.create({
        createdBy: userId,
        desc,
        title,
        startedAt,
        endedAt,
        privacy,
        userChoose,
        participants,
        // status,
      });
    } else if (privacy === "onlyMe") {
      vacation = await vacationModel.create({
        createdBy: userId,
        desc,
        title,
        startedAt,
        endedAt,
        participants,
        privacy,
        // status,
      });
    } else if (privacy === "public") {
      vacation = await vacationModel.create({
        createdBy: userId,
        desc,
        title,
        startedAt,
        endedAt,
        participants,
        // privacy,
        // status,
      });
    }

    if (milestones?.length != 0) {
      for (let i = 0; i < milestones?.length; i++) {
        const vacationId = vacation._id;
        const { time, desc } = milestones[i];
        if (
          new Date(time).getTime() > new Date(vacation.endedAt).getTime() ||
          new Date(time).getTime() < new Date(vacation.startedAt).getTime()
        ) {
          return res
            .status(400)
            .json({ message: "Thời gian nằm ngoài kỳ nghỉ. Hãy nhập lại" });
        }
        const milestone = await milestoneModel.create({
          time,
          desc,
          vacation: vacationId,
        });
        vacation.milestones.push(milestone);
        await vacation.save();
      }
    }

    res.status(200).json({
      sucess: true,
      message: "Đã tạo kỳ nghỉ thành công",
      data: vacation,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Đã xảy ra lỗi trong quá trình tạo kỳ nghỉ" });
  }
};

const updateVacation = async (req, res) => {
  try {
    // Lấy ID của kỳ nghỉ cần cập nhật từ tham số yêu cầu
    const vacationId = req.params.id;

    // Kiểm tra xem kỳ nghỉ có tồn tại hay không
    const existingVacation = await vacationModel.findById(vacationId);
    if (!existingVacation) {
      return res.status(404).json({ message: "Không tìm thấy kỳ nghỉ" });
    }

    // Kiểm tra xem người đăng nhập có quyền cập nhật kỳ nghỉ không
    if (req.user._id.toString() !== existingVacation.createdBy.toString()) {
      return res.status(403).json({
        message: "Bạn không có quyền cập nhật kỳ nghỉ",
      });
    }

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
    res.status(200).json({
      sucess: true,
      message: "Cập nhật kỳ nghỉ thành công",
      data: updatedVacation,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

const deleteVacation = async (req, res) => {
  try {
    const vacationId = req.params._id;

    const deletedVacation = await vacationModel.findByIdAndDelete(vacationId);

    return res
      .status(200)
      .json({ sucess: true, message: "Xóa kỳ nghỉ thành công" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getVacation,
  getAllVacations,
  createVacation,
  updateVacation,
  deleteVacation,
};
