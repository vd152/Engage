const Schedule = require("../models/scheduleModel");

exports.createSchedule = async (req, res) => {
  const { from, to, group, totalSeats } = req.body;
  if (!from || !to || !group || totalSeats < 0) {
    return res.status(422).json({
      success: false,
      message: "Please fill all the required fields.",
    });
  }

  let users = [];
  let createdBy = req.user._id;
  const schedule = new Schedule({
    from,
    to,
    group,
    totalSeats,
    users,
    createdBy,
  });
  schedule
    .save()
    .then((createdSchedule) => {
      return res.status(200).json({
        success: true,
        createdSchedule,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    });
};

exports.getScheduleByGroup = async (req, res) => {
  const groupid = req.params.groupid;
  Schedule.find({ group: groupid })
  .populate("createdBy")
    .then((schedule) => {
      return res.status(200).json({
        success: true,
        schedule,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    });
};
