const mileStoneModel = require("../../models/milestone");
const { milestoneSchema } = require("./validation");
const vacationModel = require("../../models/vacation");

const createMileStone = async (req, res) => {
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

    const mileStone = await mileStoneModel.create({
      time,
      desc,
      vacation: vacationId,
    });

    vacation.milestones.push(mileStone);
    await vacation.save();

    res.status(200).json({
      sucess: true,
      message: "Đã tạo milestone thành công",
      data: mileStone,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi trong quá trình tạo milestone" });
  }
};

module.exports = { createMileStone };
