const milestoneModel = require("../../models/milestone");
const { milestoneSchema } = require("./validation");
const vacationModel = require("../../models/vacation");

const createMilestone = async (req, res) => {   
  try {
    const vacationId = req.params.id;
    const { time, desc } = req.body;

    const vacation = await vacationModel.findById(vacationId);

    const validate = milestoneSchema.validate({ time, desc });
    if (validate.error) {
      return res.status(400).json({ error: validate.error.message });
    }

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

    res.status(200).json({
      sucess: true,
      message: "Đã tạo milestone thành công",
      data: milestone,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi trong quá trình tạo milestone" });
  }
};

const getMilestone = async (req, res) => {
  try {
    const milestoneId = req.params.id;

    const milestone = await milestoneModel
      .findById(milestoneId)
      .populate("vacation")
      .populate("posts");

    return res.status(200).json({
      sucess: true,
      data: milestone,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Đã xảy ra lỗi trong quá trình load milestone" });
  }
};
const getAllMilestone = async (req, res) => {};
const updateMilestone = async (req, res) => {};
const deleteMilestone = async (req, res) => {};

module.exports = {
  createMilestone,
  getAllMilestone,
  getMilestone,
  updateMilestone,
  deleteMilestone,
};
